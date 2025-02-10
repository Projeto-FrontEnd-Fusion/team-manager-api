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

  async create(projectData) {
    try {
      const id = uuidv4();
      const newProject = await this.prismaService.projects.create({
        data: {
          id: id,
          createdAt: new Date().toISOString(),
          cover: projectData.cover,
          ...projectData,
        },
      });

      this.logger.log(`Project (${projectData.projectName}, id: ${id}) created`);

      return newProject;
    } catch (error) {
      throw new BadRequestException('Erro ao criar projeto');
    }
  }

  async findMany() {
    return await this.prismaService.projects.findMany({
      include: {
        members: true,
      },
    });
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

  // TODO: Create a way to delete images after delete a project
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
