import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateHardSkillDto } from './dto/CreateHardSkill.dto';
import { HardSkillsEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { Either, left, right } from '@utils/either';

@Injectable()
export class HardSkillService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateHardSkillDto): Promise<Either<Error, HardSkillsEntity>> {
    try {
      const newHardSkill = await this.prismaService.hardSkills.create({
        data: {
          id: uuidv4(),
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      return right(newHardSkill);
    } catch (error) {
      return left(new Error('Não foi possivel criar uma nova skill.'));
    }
  }

  async findById(id: string): Promise<Either<NotFoundException | Error, HardSkillsEntity>> {
    try {
      const skill = await this.prismaService.hardSkills.findFirst({
        where: { id: id },
      });

      if (!skill) {
        return left(new NotFoundException('Skill não encontrada.'));
      }

      return right(skill);
    } catch (error) {
      return left(new Error(error));
    }
  }

  async findMany(): Promise<Either<Error, HardSkillsEntity[] | []>> {
    try {
      const data = await this.prismaService.hardSkills.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });
      return right(data);
    } catch (err) {
      return left(new Error(err));
    }
  }

  async delete(id: string): Promise<Either<NotFoundException | Error, HardSkillsEntity | void>> {
    try {
      const skill = this.prismaService.hardSkills.delete({
        where: { id: id },
      });

      if (!skill) {
        throw new NotFoundException('Skill não encontrada.');
      }

      return right();
    } catch (error) {
      return left(new Error(error));
    }
  }

  async update(id: string, payload: Partial<HardSkillsEntity>): Promise<Either<NotFoundException | Error, HardSkillsEntity>> {
    try {
      const skill = await this.prismaService.hardSkills.findFirst({
        where: { id: id },
      });

      if (!skill) {
        return left(new NotFoundException('Skill não encontrada.'));
      }

      const result = await this.prismaService.hardSkills.update({
        where: { id: id },
        data: {
          name: payload.name || skill.name,
        },
      });

      return right(result);
    } catch (err) {
      return left(new Error(err))
    }
  }
}
