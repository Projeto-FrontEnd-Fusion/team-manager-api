import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { CreateSkillDto } from './dto/CreateSkill.dto';
import { SkillsEntity } from 'src/entities';

@Injectable()
export class SkillService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateSkillDto) {
    try {
      const newSkill = await this.prismaService.skills.create({
        data: {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          description: payload.description,
          name: payload.name,
        },
      });

      return newSkill;
    } catch (error) {
      throw new Error('Não foi possivel criar uma nova skill.');
    }
  }

  async findById(id: string) {
    try {
      const skill = this.prismaService.skills.findFirst({
        where: { id: id },
      });

      if (!skill) {
        throw new NotFoundException('Skill não encontrada.');
      }

      return skill;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMany() {
    return await this.prismaService.skills.findMany();
  }

  async delete(id: string) {
    try {
      const skill = this.prismaService.skills.delete({
        where: { id: id },
      });

      if (!skill) {
        throw new NotFoundException('Skill não encontrada.');
      }

      return skill;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, payload: Partial<SkillsEntity>) {
    const skill = await this.prismaService.skills.findFirst({
      where: { id: id },
    });

    if (!skill) {
      throw new NotFoundException('Skill não encontrada.');
    }

    await this.prismaService.skills.update({
      where: { id: id },
      data: {
        name: payload.name || skill.name,
      },
    });
  }
}
