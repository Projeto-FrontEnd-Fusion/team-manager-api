import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { SkillsEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { CreateSkillDto } from './dto/CreateSkill.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateSkillDto) {
    try {
      const newSkill = await this.prismaService.skills.create({
        data: {
          id: uuidv4(),
          name: payload.name,
          createdAt: new Date().toISOString(),
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
    const data = await this.prismaService.skills.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
      }
    });
    console.log(data);
    return data;
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
