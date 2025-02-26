import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateSoftSkillDto } from './dto/CreateSoftSkill.dto';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';

@Injectable()
export class SoftSkillService {
  private readonly logger = new Logger(SoftSkillService.name);

  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateSoftSkillDto) {
    try {
      const id = uuidv4();
      const newSoftSkill = await this.prismaService.softSkills.create({
        data: {
          id: id,
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      return newSoftSkill;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) {
        throw new NotFoundException('Soft Skill não encontrada.');
      }

      return softSkill;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findMany() {
    return await this.prismaService.softSkills.findMany();
  }

  async delete(id: string) {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) {
        throw new NotFoundException('Soft Skill não encontrada.');
      }

      await this.prismaService.softSkills.delete({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, payload) {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) {
        throw new NotFoundException('Soft Skill não encontrada.');
      }

      await this.prismaService.softSkills.update({
        where: { id: id },
        data: {
          name: payload.name || softSkill.name,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
