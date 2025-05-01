import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';
import { Either, left, right } from '@utils/either';
import { EmailAlreadyRegisteredError } from 'src/errors/user/EmailAlreadyRegistered';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async create(
    payload: CreateMemberDto,
    file: Express.Multer.File,
  ): Promise<Either<EmailAlreadyRegisteredError | Error, MemberEntity>> {
    try {
      const id = uuidv4();
      const newMember = await this.prismaService.member.create({
        data: {
          id: id,
          name: payload.name,
          birthDate: payload.birhDate,
          communityLevel: payload.communityLevel,
          currentSquad: payload.currentSquad,
          stack: payload.stack,
          profileImageUrl: payload.profileImage,
          createdAt: new Date().toISOString(),
          userId: payload.userId,
          professionalProfiles: {
            createMany: {
              data: payload.professionalProfiles.map((profile) => ({
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                ...profile,
              })),
            },
          },
          HardSkillsMembers: {
            create: payload.hardSkills.map((hardSkillId) => ({
              hardSkill: {
                connect: { id: hardSkillId },
              },
            })),
          },
          SoftSkillsMembers: {
            create: payload.softSkills.map((softSkillId) => ({
              softSkill: {
                connect: { id: softSkillId },
              },
            })),
          },
        },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: {
            select: {
              hardSkill: {
                select: {
                  id: true,
                  name: true,
                  createdAt: true,
                }
              }
            },
          },
          SoftSkillsMembers: {
            include: {
              softSkill: true,
            },
          },
        },
      });

      this.logger.log(`Member (${payload}, id: ${id} created`);

      const memberEntity: MemberEntity = {
        ...newMember,
        hardSkills: newMember.HardSkillsMembers.map((hsm) => hsm.hardSkill),
        softSkills: newMember.SoftSkillsMembers.map((ssm) => ssm.softSkill),
      };

      return right(memberEntity);
    } catch (err) {
      console.log(err)
      return left(new Error(err));
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

      if (!member) {
        return left(new BadRequestException('Usuário não encontrado.'));
      }

      return right(member);
    } catch (err) {
      return left(new BadRequestException(err))
    }
  }

  async findMany(): Promise<Either<Error, Partial<MemberEntity>[] | []>> {
    try {
      const data = await this.prismaService.member.findMany();
      return right(data);
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      );
    }
  }

  // TODO: Mudar o tipo de return
  async delete(
    id: string,
  ): Promise<Either<Error, Partial<MemberEntity> | any>> {
    try {
      const member = await this.prismaService.member.findFirst({
        where: { id },
        include: { projects: true },
      });

      if (!member) {
        throw new NotFoundException('Membro não encontrado.');
      }

      await this.prismaService.member.delete({ where: { id: id } });
      await deleteFile(member.profileImageUrl);

      return right();
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
      throw error;
    }
  }

  async update(
    id: string,
    payload: UpdateMemberDto,
    file: Express.Multer.File,
  ): Promise<Either<Error, Partial<MemberEntity>>> {
    try {
      const memberExists = await this.prismaService.member.findFirst({
        where: { id: id },
        include: {
          projects: true,
        },
      });

      if (!memberExists) {
        throw new NotFoundException('Membro não encontrado.');
      }

      if (file.path && file.path !== memberExists.profileImageUrl) {
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
          profileImageUrl: file.path || memberExists.profileImageUrl,
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
  ): Promise<Either<Error, Partial<MemberEntity>>> {
    try {
      const result = await this.prismaService.projects.update({
        where: { id: projectId },
        data: {
          members: {
            disconnect: { id: memberId },
          },
        },
      });

      return right(result);
    } catch (err) {
      console.error(err);
      return left(new Error(err));
    }
  }
}
