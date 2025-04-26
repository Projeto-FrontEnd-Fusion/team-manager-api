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
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateMemberDto, file: Express.Multer.File) {
    try {
      const id = uuidv4();
      const newMember = await this.prismaService.member.create({
        data: {
          id: id,
          name: payload.name,
          communityLevel: payload.communityLevel,
          currentSquad: payload.currentSquad,
          stack: payload.stack,
          profileImageUrl: file.path,
          createdAt: new Date().toISOString(),
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
        },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: {
            include: {
              hardSkill: true,
            },
          },
        },
      });

      this.logger.log(`Member (${payload.name}, id: ${id} created`);

      return newMember;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      const member = await this.prismaService.member.findFirst({
        where: { id: id },
        include: {
          professionalProfiles: true,
          projects: true,
          HardSkillsMembers: true,
        },
      });
      if (!member) {
        throw new BadRequestException('Usuário não encontrado.');
      }
      return member;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findMany() {
    try {
      const data = await this.prismaService.member.findMany({});
      return data;
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      );
    }
  }

  async delete(id: string): Promise<void> {
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
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
      throw error;
    }
  }

  async update(
    id: string,
    payload: UpdateCreateMemberDto,
    file: Express.Multer.File,
  ): Promise<MemberEntity> {
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

    return await this.prismaService.member.update({
      where: { id: id },
      data: {
        name: payload.name || memberExists.name,
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
    });
  }

  async deleteMemberFromProject(memberId: string, projectId: string) {
    return await this.prismaService.projects.update({
      where: { id: projectId },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    });
  }
}
