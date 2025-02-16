import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload) {
    try {
      const id = uuidv4();
      const newMember = await this.prismaService.member.create({
        data: {
          id: id,
          name: payload.name,
          communityLevel: payload.communityLevel,
          currentSquad: payload.currentSquad,
          stack: payload.stack,
          profileImage: payload.profileImage,
          professionalProfiles: {
            createMany: {
              data: payload.professionalProfiles.map((profile) => ({
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                ...profile,
              })),
            },
          },
          projects: {
            connect: payload.projects.map((id) => ({
              id: id,
            })),
          },
          SkillsMembers: {
            connect: payload.skills.map((id) => ({
              id: id,
            })),
          },
          SoftSkillsMembers: {
            connect: payload.softSkills.map((id) => ({
              id: id,
            })),
          },
          createdAt: new Date().toISOString(),
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
          SkillsMembers: true,
          SoftSkillsMembers: true,
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
      return await this.prismaService.member.findMany();
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
      await deleteFile(member.profileImage);
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
      throw error;
    }
  }

  async update(id: string, payload: UpdateCreateMemberDto) {
    const memberExists = await this.prismaService.member.findFirst({
      where: { id: id },
    });

    if (!memberExists) {
      throw new NotFoundException('Membro não encontrado.');
    }

    if (payload.profileImage && payload.profileImage !== memberExists.profileImage) {
      await deleteFile(memberExists.profileImage);
    }

    memberExists.profileImage = payload.profileImage || memberExists.profileImage;

    if (payload.stack && payload.stack !== '') {
      memberExists.stack = payload.stack;
    }

    if (payload.communityLevel && payload.communityLevel !== '') {
      memberExists.communityLevel = payload.communityLevel;
    }

    if (payload.currentSquad && payload.currentSquad !== '') {
      memberExists.currentSquad = payload.currentSquad;
    }

    if (payload.name && payload.name !== '') {
      memberExists.name = payload.name;
    }

    await this.prismaService.member.update({
      where: { id: id },
      data: memberExists,
    });
    return memberExists;
  }
}
