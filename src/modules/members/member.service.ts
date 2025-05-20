import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { MemberEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { deleteFile } from '../shared/deleteFiles';
import { Either, left, right } from '@utils/either';
import { EmailAlreadyRegisteredError, UserNotFound } from 'src/errors/user';
import { MemberNotFound } from 'src/errors/member';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateMemberDto): Promise<
    Either<EmailAlreadyRegisteredError | Error, MemberEntity>
  > {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: { id: payload.userId }
      })

      if (!userExists) return left(new UserNotFound());

      const existingMember = await this.prismaService.member.findUnique({
        where: { userId: payload.userId },
      });

      if (existingMember) return left(new Error('Já existe um membro associado a este usuário.'));

      const memberId = uuidv4();

      const professionalProfiles = (payload.professionalProfiles || [])
        .filter((profile) => profile.platform && profile.url)
        .map((profile) => ({
          id: uuidv4(),
          platform: profile.platform,
          url: profile.url,
          createdAt: new Date().toISOString(),
          memberId: memberId
        }));

      const hardSkills = (payload.hardSkills || []).map((hardSkillId) => ({
        hardSkill: { connect: { id: hardSkillId } },
      }));

      const softSkills = (payload.softSkills || []).map((softSkillId) => ({
        softSkill: { connect: { id: softSkillId } },
      }));

      const newMember = await this.prismaService.member.create({
        data: {
          id: memberId,
          name: payload.name,
          communityLevel: payload.communityLevel,
          currentSquad: payload.currentSquad,
          stack: payload.stack,
          profileImageUrl: payload.profileImage,
          createdAt: new Date().toISOString(),
          userId: payload.userId,
          professionalProfiles: {
            createMany: { data: professionalProfiles },
          },
          HardSkillsMembers: { create: hardSkills },
          SoftSkillsMembers: { create: softSkills },
        },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: { include: { hardSkill: true } },
          SoftSkillsMembers: { include: { softSkill: true } },
        },
      });

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] Member (${payload}, id: ${newMember.id} created`);

      return right(newMember);
    } catch (err) {
      console.log(err);
      this.logger.error(`[MemberService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err.message));
    }
  }

  async findById(id: string): Promise<Either<Error, Partial<MemberEntity>>> {
    try {
      const member = await this.prismaService.member.findFirst({
        where: { id: id },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: { include: { hardSkill: true } },
          SoftSkillsMembers: { include: { softSkill: true } },
        },
      });

      if (!member) return left(new MemberNotFound());

      return right(member);
    } catch (err) {
      return left(new BadRequestException(err));
    }
  }

  async findMany(): Promise<Either<Error, MemberEntity[] | []>> {
    try {
      const members = await this.prismaService.member.findMany({
        include: {
          projects: true,
          HardSkillsMembers: { include: { hardSkill: true } },
          SoftSkillsMembers: { include: { softSkill: true } },
          professionalProfiles: true
        }
      });

      return right(members);
    } catch (error) {
      return left(new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      ));
    }
  }

  async update(memberId: string, payload: UpdateMemberDto): Promise<
    Either<Error | MemberNotFound, Partial<MemberEntity>>
  > {
    try {
      const memberExists = await this.prismaService.member.findFirst({
        where: { id: memberId },
        include: {
          projects: true,
          professionalProfiles: true,
          HardSkillsMembers: { include: { hardSkill: true } },
          SoftSkillsMembers: { include: { softSkill: true } }
        }
      });
      console.log(payload.professionalProfiles)
      if (!memberExists) return left(new MemberNotFound());

      if (payload.profileImageUrl == '' || null) {
        await deleteFile(memberExists.profileImageUrl);
      }

      // Atualiza os professionalProfiles
      if (payload.professionalProfiles) {
        // Remove perfis antigos que não estão no payload
        const profilesToDelete = memberExists.professionalProfiles.filter(
          (profile) =>
            !payload.professionalProfiles.some(
              (newProfile) => newProfile.id === profile.id,
            ),
        );

        for (const profile of profilesToDelete) {
          await this.prismaService.professionalProfile.delete({
            where: { id: profile.id },
          });
        }

        // Atualiza ou cria novos perfis
        for (const profile of payload.professionalProfiles) {
          if (profile.id) {
            // Atualiza perfis existentes
            await this.prismaService.professionalProfile.update({
              where: { id: profile.id },
              data: {
                platform: profile.platform,
                url: profile.url,
              },
            });
          } else {
            await this.prismaService.member.update({
              where: { id: memberExists.id },
              data: {
                professionalProfiles: {
                  create: {
                    id: uuidv4(),
                    url: profile.url,
                    platform: profile.platform,
                    createdAt: new Date().toISOString(),
                  }
                }
              },
            });
          }
        }
      }

      const currentProjectIds = payload.projectsIds && memberExists.projects.map(
        (project) => project.id,
      );
      const projectsToDisconnect = payload.projectsIds && currentProjectIds.filter(
        (projectId) => !payload.projectsIds.includes(projectId),
      ).map((projectId) => ({ id: projectId }));

      const projectsToConnect = payload.projectsIds && payload.projectsIds.filter(
        (projectId) => !currentProjectIds.includes(projectId),
      ).map((projectId) => ({ id: projectId }));

      // Verifica alterações em HardSkills
      const currentHardSkillIds = payload.hardSkills && memberExists.HardSkillsMembers.map(
        (hardSkillMember) => hardSkillMember.hardSkill.id,
      );
      const hardSkillsToConnect = payload.hardSkills && payload.hardSkills?.filter(
        (hardSkillId) => !currentHardSkillIds.includes(hardSkillId),
      ).map((hardSkillId) => ({ hardSkill: { connect: { id: hardSkillId } } })) || [];

      const hardSkillsToDisconnect = payload.hardSkills && currentHardSkillIds.filter(
        (hardSkillId) => !payload.hardSkills?.includes(hardSkillId),
      );

      // Verifica alterações em SoftSkills
      const currentSoftSkillIds = payload.softSkills && memberExists.SoftSkillsMembers.map(
        (softSkillMember) => softSkillMember.softSkill.id,
      );
      const softSkillsToConnect = payload.softSkills && payload.softSkills?.filter(
        (softSkillId) => !currentSoftSkillIds.includes(softSkillId),
      ).map((softSkillId) => ({ softSkill: { connect: { id: softSkillId } } })) || [];

      const softSkillsToDisconnect = payload.softSkills && currentSoftSkillIds.filter(
        (softSkillId) => !payload.softSkills?.includes(softSkillId),
      );

      // Remove associações apenas se necessário
      if (hardSkillsToDisconnect && hardSkillsToDisconnect.length > 0) {
        await this.prismaService.hardSkillsMembers.deleteMany({
          where: {
            memberId: memberId,
            hardSkillId: { in: hardSkillsToDisconnect },
          },
        });
      }

      if (softSkillsToDisconnect && softSkillsToDisconnect.length > 0) {
        await this.prismaService.softSkillsMembers.deleteMany({
          where: {
            memberId: memberId,
            softSkillId: { in: softSkillsToDisconnect },
          },
        });
      }

      const updatedMember = await this.prismaService.member.update({
        where: { id: memberId },
        data: {
          communityLevel: payload.communityLevel || memberExists.communityLevel,
          currentSquad: payload.currentSquad || memberExists.currentSquad,
          stack: payload.stack || memberExists.stack,
          profileImageUrl: payload.profileImageUrl || memberExists.profileImageUrl,
          projects: {
            disconnect: projectsToConnect,
            connect: projectsToDisconnect,
          },
          HardSkillsMembers: { create: hardSkillsToConnect },
          SoftSkillsMembers: { create: softSkillsToConnect }
        },
        include: {
          HardSkillsMembers: { include: { hardSkill: true } },
          SoftSkillsMembers: { include: { softSkill: true } },
          professionalProfiles: true,
          projects: true
        },
      });

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] Member ${updatedMember.name} (${updatedMember.id}) updated`)
      return right(updatedMember);
    } catch (err) {
      console.log(err);
      this.logger.error(err);
      return left(new Error('Bad request'));
    }
  }

  async delete(id: string): Promise<Either<Error, Partial<MemberEntity> | any>> {
    try {
      const member = await this.prismaService.member.findFirst({
        where: { id },
        include: { projects: true },
      });

      if (!member) return left(new MemberNotFound());

      await this.prismaService.member.delete({ where: { id: id } });
      await deleteFile(member.profileImageUrl);

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] ${member.name} deleted.`)

      return right();
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
      throw error;
    }
  }

  async deleteMemberFromProject(
    memberId: string,
    projectId: string,
  ): Promise<Either<Error | MemberNotFound, Partial<MemberEntity>>> {
    try {
      const memberExists = await this.prismaService.member.findFirst({
        where: { id: memberId }
      });

      if (!memberExists) return left(new MemberNotFound());

      const result = await this.prismaService.projects.update({
        where: { id: projectId },
        data: {
          members: {
            disconnect: { id: memberId },
          },
        },
      });

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] Member ${memberId} was excluded from project ${projectId} `)

      return right(result);
    } catch (err) {
      console.error(err);
      return left(new Error(err));
    }
  }
}
