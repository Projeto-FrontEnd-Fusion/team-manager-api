import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { deleteFile } from '@modules/shared/deleteFiles';
import { Either, left, right } from '@utils/either';
import { ProjectEntity } from 'src/entities';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload): Promise<Either<Error, ProjectEntity>> {
    try {
      const id = uuidv4();
      const newProject = await this.prismaService.projects.create({
        data: {
          id: id,
          createdAt: new Date().toISOString(),
          cover: payload.cover,
          ...payload,
        },
      });

      this.logger.log(`Project (${payload.name}, id: ${id}) created`);

      return right(newProject);
    } catch (error) {
      if (error.code == 'P2002') {
        return left(new Error(`Unique constraint error, id already exists`));
      }
      return left(new BadRequestException('Erro ao criar projeto'));
    }
  }

  async findMany() {
    try {
      const result = await this.prismaService.projects.findMany({
        include: {
          members: true,
        },
      });

      return right(result);
    } catch (error) {
      return left(new Error(
        'Ocorreu um erro ao buscar projetos. Tente novamente mais tarde.',
      ));
    }
  }

  async findById(projectId: string) {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException(
          `Projeto com id ${projectId} não encontrado`,
        );
      }

      return right(project);
    } catch (error) {
      return left(new NotFoundException());
    }
  }

  async delete(projectId: string) {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException('Não foi possível encontrar o projeto.');
      }

      await this.prismaService.projects.delete({ where: { id: projectId } });
      await deleteFile(project.cover);

      return right();
    } catch (error) {
      return left(new Error(error));
    }
  }

  async updateProject(projectId: string, payload): Promise<Either<Error, ProjectEntity>> {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) {
        return left(new NotFoundException(`Can't found project.`));
      }

      const updatedProject = await this.prismaService.projects.update({
        where: { id: projectId },
        data: {
          ...payload,
          id: project.id,
          updatedAt: new Date().toISOString(),
        },
      });

      return right(updatedProject);
    } catch (err) {
      return left(new BadRequestException(`Can't update project.`))
    }
  }
}
