import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateSoftSkillDto } from './dto/CreateSoftSkill.dto';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { Either, left, right } from '@utils/either';
import { SoftSkillsEntity } from 'src/entities';
import { SoftSkillNotFounded } from 'src/errors/softSkills';
import { PrismaClientError } from 'src/types/PrismaErrors';
import { UpdateProjectDto } from '@modules/project/dto/UpdateProject.dto';

@Injectable()
export class SoftSkillService {
  private readonly logger = new Logger(SoftSkillService.name);

  constructor(private readonly prismaService: PrismaService) { }

  async create(
    payload: CreateSoftSkillDto,
  ): Promise<Either<Error, SoftSkillsEntity>> {
    try {
      const id = uuidv4();
      const newSoftSkill = await this.prismaService.softSkills.create({
        data: {
          id: id,
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      });

      this.logger.log(`[SoftSkillService - ${new Date().toLocaleString()}] Soft Skill ${newSoftSkill.name} created.`)

      return right(newSoftSkill);
    } catch (err) {
      this.logger.error(`[SoftSkillService - ${new Date().toLocaleString()}] `, err);
      if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case PrismaClientError.UNIQUE_CONSTRAINT_FAILED:
            return left(new BadRequestException('Soft Skill já existe.'))
          default:
            break;
        }
      }
      return left(new Error(err.message));
    }
  }

  async findById(id: string): Promise<Either<NotFoundException | SoftSkillNotFounded | Error, SoftSkillsEntity>> {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) return left(new SoftSkillNotFounded());

      return right(softSkill);
    } catch (err) {
      this.logger.error(`[SoftSkillService - ${new Date().toLocaleString()}]`, err);
      return left(new BadRequestException(err));
    }
  }

  async findMany(): Promise<Either<Error, SoftSkillsEntity[] | []>> {
    try {
      const result = await this.prismaService.softSkills.findMany();

      if (!result) return left(
        new SoftSkillNotFounded('Soft Skills not founded.')
      )

      return right(result);
    } catch (err) {
      this.logger.error(`[SoftSkillService - ${new Date().toLocaleString()}]`, err);
      return left(new BadRequestException());
    }
  }

  async delete(id: string): Promise<Either<BadRequestException | NotFoundException | Error, any>> {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) return left(new SoftSkillNotFounded());

      await this.prismaService.softSkills.delete({ where: { id: id } });

      this.logger.log(`[${new Date().toLocaleString()}] Soft Skill ${softSkill.name} (${softSkill.id}) deleted`)

      return right();
    } catch (err) {
      this.logger.error(`[SoftSkillService - ${new Date().toLocaleString()}]`, err);
      return left(new BadRequestException(err));
    }
  }

  async update(
    id: string,
    payload: Partial<UpdateProjectDto>,
  ): Promise<Either<NotFoundException | Error, SoftSkillsEntity | any>> {
    try {
      const softSkill = await this.prismaService.softSkills.findFirst({
        where: { id: id },
      });

      if (!softSkill) return left(new SoftSkillNotFounded());

      const updatedSoftSkill = await this.prismaService.softSkills.update({
        where: { id: id },
        data: {
          name: payload.name || softSkill.name,
        },
      });

      this.logger.log(`[${new Date().toLocaleString()}] Soft Skill ${softSkill.name} (${softSkill.id}) updated.`)

      return right(updatedSoftSkill);
    } catch (err) {
      this.logger.error(`[SoftSkillService - ${new Date().toLocaleString()}]`, err);
      return left(new BadRequestException(err));
    }
  }
}
