import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateHardSkillDto } from './dto/CreateHardSkill.dto';
import { HardSkillsEntity } from 'src/entities';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { Either, left, right } from '@utils/either';
import { HardSkillNotFounded } from 'src/errors/hardSkills';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClientError } from 'src/types/PrismaErrors';

@Injectable()
export class HardSkillService {
  private readonly logger = new Logger(HardSkillService.name);

  constructor(private readonly prismaService: PrismaService) { }

  async create(
    payload: CreateHardSkillDto,
  ): Promise<Either<Error | BadRequestException, HardSkillsEntity>> {
    try {
      const newHardSkill = await this.prismaService.hardSkills.create({
        data: {
          id: uuidv4(),
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      this.logger.log(`[HardSkillService - ${new Date().toLocaleString()}] Hard Skill ${newHardSkill.name} created.`)

      return right(newHardSkill);
    } catch (err) {
      this.logger.error(`[HardSkillService - ${new Date().toLocaleString()}] `, err);
      if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case PrismaClientError.UNIQUE_CONSTRAINT_FAILED:
            return left(new BadRequestException('Hard Skill com esse nome já existe.'));
          default:
            break;
        }
      }
      return left(new Error('Não foi possivel criar uma nova skill.'));
    }
  }

  async findById(id: string,): Promise<
    Either<NotFoundException | Error | HardSkillNotFounded, HardSkillsEntity>
  > {
    try {
      const skill = await this.prismaService.hardSkills.findFirst({
        where: { id: id },
      });

      if (!skill) return left(new HardSkillNotFounded());

      return right(skill);
    } catch (err) {
      this.logger.error(`[HardSkillService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err));
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
      this.logger.error(`[HardSkillService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err));
    }
  }

  async delete(
    id: string,
  ): Promise<Either<NotFoundException | Error, HardSkillsEntity | void>> {
    try {
      const hardSkillDeleted = await this.prismaService.hardSkills.delete({
        where: { id: id },
      });

      if (!hardSkillDeleted) return left(new HardSkillNotFounded());

      this.logger.log(`[HardSkillService - ${new Date().toLocaleString()}] Hard Skill ${hardSkillDeleted.name} (${hardSkillDeleted.id}) deleted.`)

      return right();
    } catch (err) {
      this.logger.error(`[HardSkillService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err));
    }
  }

  async update(
    id: string,
    payload: Partial<HardSkillsEntity>,
  ): Promise<Either<NotFoundException | Error, HardSkillsEntity>> {
    try {
      const hardSkillExists = await this.prismaService.hardSkills.findFirst({
        where: { id: id },
      });

      if (!hardSkillExists) return left(new HardSkillNotFounded());

      const hardSkillUpdated = await this.prismaService.hardSkills.update({
        where: { id: id },
        data: {
          name: payload.name || hardSkillExists.name,
        },
      });

      this.logger.log(`[HardSkillService - ${new Date().toLocaleString()}] Hard Skill ${hardSkillUpdated.name} (${hardSkillUpdated.id})`);

      return right(hardSkillUpdated);
    } catch (err) {
      this.logger.error(`[HardSkillService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err));
    }
  }
}
