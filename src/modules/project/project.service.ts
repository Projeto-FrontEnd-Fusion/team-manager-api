import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { deleteFile } from '@modules/shared/deleteFiles';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload) {
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

      return newProject;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new Error(`Unique constraint error, id already exists`);
      }
      throw new BadRequestException('Erro ao criar projeto');
    }
  }

  async findMany() {
    try {
      return await this.prismaService.projects.findMany({
        include: {
          members: true,
        },
      });
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar projetos. Tente novamente mais tarde.');
    }
  }

  async findById(projectId: string) {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException(`Projeto com id ${projectId} não encontrado`);
      }

      return project;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteById(projectId: string) {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException('Não foi possível encontrar o projeto.');
      }

      await this.prismaService.projects.delete({ where: { id: projectId } });
      await deleteFile(project.cover);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProject(projectId: string, payload) {
    const project = await this.prismaService.projects.findFirst({
      where: { id: projectId },
    });

    if (!project) {
      return new NotFoundException();
    }

    const updatedProject = {
      ...payload,
      id: project.id,
      updatedAt: new Date().toISOString(),
    };

    await this.prismaService.projects.update({
      where: { id: project.id },
      data: updatedProject,
    });

    return updatedProject;
  }
}
