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
        hardSkill: {
          connect: { id: hardSkillId },
        },
      }));

      const softSkills = (payload.softSkills || []).map((softSkillId) => ({
        softSkill: {
          connect: { id: softSkillId },
        },
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
            createMany: {
              data: professionalProfiles,
            },
          },
          HardSkillsMembers: {
            create: hardSkills,
          },
          SoftSkillsMembers: {
            create: softSkills,
          },
        },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: {
            include: { hardSkill: true },
          },
          SoftSkillsMembers: {
            include: { softSkill: true },
          },
        },
      });

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] Member (${payload}, id: ${newMember.id} created`);

      const memberEntity: MemberEntity = {
        ...newMember,
        hardSkills: newMember.HardSkillsMembers.map((hsm) => hsm.hardSkill),
        softSkills: newMember.SoftSkillsMembers.map((ssm) => ssm.softSkill),
      };

      return right(memberEntity);
    } catch (err) {
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
          HardSkillsMembers: true,
          SoftSkillsMembers: true,
          user: true,
        },
      });

      if (!member) return left(new MemberNotFound());

      return right(member);
    } catch (err) {
      return left(new BadRequestException(err));
    }
  }

  async findMany(): Promise<Either<Error, Partial<MemberEntity>[] | []>> {
    try {
      const data = await this.prismaService.member.findMany({
        include: {
          projects: true,
          HardSkillsMembers: {
            select: {
              hardSkill: true
            }
          },
          SoftSkillsMembers: {
            select: {
              softSkill: true
            }
          },
          professionalProfiles: true
        }
      });

      return right(data);
    } catch (error) {
      return left(new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      ));
    }
  }

  async delete(
    id: string,
  ): Promise<Either<Error, Partial<MemberEntity> | any>> {
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

  async update(id: string, payload: UpdateMemberDto): Promise<
    Either<Error | MemberNotFound, Partial<MemberEntity>>
  > {
    try {
      const memberExists = await this.prismaService.member.findFirst({
        where: { id: id },
        include: {
          projects: true,
        },
      });

      if (!memberExists) return left(new MemberNotFound());

      if (payload.profileImageUrl == '' || null) {
        await deleteFile(memberExists.profileImageUrl);
      }

      // Identifica os projetos que precisam ser desconectados
      const currentProjectIds = memberExists.projects.map(
        (project) => project.id,
      );
      const projectsToDisconnect = currentProjectIds.filter(
        (projectId) => !payload.projectsIds.includes(projectId),
      );

      // Identifica os projetos que precisam ser conectados
      const projectsToConnect = payload.projectsIds.filter(
        (projectId) => !currentProjectIds.includes(projectId),
      );

      const updatedMember = await this.prismaService.member.update({
        where: { id: id },
        data: {
          communityLevel: payload.communityLevel || memberExists.communityLevel,
          currentSquad: payload.currentSquad || memberExists.currentSquad,
          stack: payload.stack || memberExists.stack,
          profileImageUrl: payload.profileImageUrl || memberExists.profileImageUrl,
          projects: {
            disconnect: projectsToDisconnect.map((projectId) => ({
              id: projectId,
            })), // Desconecta os projetos
            connect: projectsToConnect.map((projectId) => ({ id: projectId })), // Conecta os novos projetos
          },
        },
        include: {
          HardSkillsMembers: {
            include: {
              hardSkill: true,
            },
          },
          SoftSkillsMembers: {
            include: {
              softSkill: true,
            },
          },
        },
      });

      this.logger.log(`[MemberService - ${new Date().toLocaleString()}] Member ${updatedMember.name} (${updatedMember.id}) updated`)

      return right({
        ...updatedMember,
        hardSkills: updatedMember.HardSkillsMembers.map((hsm) => hsm.hardSkill),
        softSkills: updatedMember.SoftSkillsMembers.map((ssm) => ssm.softSkill),
      });
    } catch (err) {
      return left(new Error('Bad request'));
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
