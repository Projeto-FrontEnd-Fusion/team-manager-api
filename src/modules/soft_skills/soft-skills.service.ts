import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateSoftSkillDto } from './dto/CreateSoftSkill.dto';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { Either, left, right } from '@utils/either';
import { SoftSkillsEntity } from 'src/entities';

@Injectable()
export class SoftSkillService {
  private readonly logger = new Logger(SoftSkillService.name);

  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateSoftSkillDto): Promise<Either<Error, SoftSkillsEntity>> {
    try {
      const id = uuidv4();
      const newSoftSkill = await this.prismaService.softSkills.create({
        data: {
          id: id,
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      return right(newSoftSkill);
    } catch (error) {
      return left(new Error(error));
    }
  }

  async findById(id: string): Promise<Either<NotFoundException | Error, SoftSkillsEntity>> {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) {
        throw new NotFoundException('Soft Skill não encontrada.');
      }

      return right(softSkill);
    } catch (error) {
      return left(new BadRequestException(error));
    }
  }

  async findMany(): Promise<Either<Error, SoftSkillsEntity[] | []>> {
    try {
      const result = await this.prismaService.softSkills.findMany();
      return right(result)
    } catch (err) {
      return left(new Error('Bad request'))
    }
  }

  async delete(id: string): Promise<Either<NotFoundException | Error, any>> {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) {
        throw new NotFoundException('Soft Skill não encontrada.');
      }

      await this.prismaService.softSkills.delete({ where: { id: id } });

      return right();
    } catch (error) {
      return left(new BadRequestException(error));
    }
  }

  async update(id: string, payload): Promise<Either<NotFoundException | Error, SoftSkillsEntity | any>> {
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

      return right();
    } catch (error) {
      return left(new BadRequestException(error));
    }
  }
}
