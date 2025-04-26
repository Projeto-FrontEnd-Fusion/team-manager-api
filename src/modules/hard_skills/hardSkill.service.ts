import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateHardSkillDto } from './dto/CreateHardSkill.dto';
import { HardSkillsEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';

@Injectable()
export class HardSkillService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateHardSkillDto) {
    try {
      const newHardSkill = await this.prismaService.hardSkills.create({
        data: {
          id: uuidv4(),
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      return newHardSkill;
    } catch (error) {
      throw new Error('Não foi possivel criar uma nova skill.');
    }
  }

  async findById(id: string) {
    try {
      const skill = this.prismaService.hardSkills.findFirst({
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
    const data = await this.prismaService.hardSkills.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    console.log(data);
    return data;
  }

  async delete(id: string) {
    try {
      const skill = this.prismaService.hardSkills.delete({
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

  async update(id: string, payload: Partial<HardSkillsEntity>) {
    const skill = await this.prismaService.hardSkills.findFirst({
      where: { id: id },
    });

    if (!skill) {
      throw new NotFoundException('Skill não encontrada.');
    }

    await this.prismaService.hardSkills.update({
      where: { id: id },
      data: {
        name: payload.name || skill.name,
      },
    });
  }
}
