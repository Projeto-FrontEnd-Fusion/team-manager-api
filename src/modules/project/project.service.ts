import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { deleteFile } from '@modules/shared/deleteFiles';
import { Either, left, right } from '@utils/either';
import { ProjectEntity } from 'src/entities';
import { ProjectNotFound } from 'src/errors/projects';
import { PrismaClientError } from 'src/types/PrismaErrors';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(private readonly prismaService: PrismaService) { }

  async create(payload: CreateProjectDto): Promise<Either<Error, ProjectEntity>> {
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

      this.logger.log(`[ProjectService - ${new Date().toLocaleString()}] Project (${payload.name}, id: ${id}) created`);

      return right(newProject);
    } catch (err) {
      this.logger.error(`[ProjectService - ${new Date().toLocaleString()}] `, err);
      // TODO: Exemplo de como tratar os erros de forma melhor.
      if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case PrismaClientError.UNIQUE_CONSTRAINT_FAILED:
            return left(new BadRequestException('Projeto com esse id já existe.'))
          default:
            break;
        }
      }
      return left(new BadRequestException('Erro ao criar projeto'))
    }
  }

  async findMany(): Promise<Either<BadRequestException | Error, ProjectEntity[] | []>> {
    try {
      const result = await this.prismaService.projects.findMany({
        include: {
          members: true
        }
      });

      return right(result);
    } catch (err) {
      this.logger.error(`[ProjectService - ${new Date().toLocaleString()}] `, err);
      return left(new BadRequestException('Não foi possível encontrar os projetos.'));
    }
  }

  async findById(projectId: string): Promise<
    Either<ProjectNotFound | Error | BadRequestException, ProjectEntity>
  > {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
        include: {
          members: true
        }
      });

      if (!project) return left(new ProjectNotFound());

      return right(project);
    } catch (err) {
      this.logger.error(`[ProjectService - ${new Date().toLocaleString()}] `, err);
      return left(new BadRequestException('Não foi possível encontrar projeto.'));
    }
  }

  async delete(projectId: string): Promise<Either<ProjectNotFound | Error, any>> {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
      });

      if (!project) return left(new ProjectNotFound());

      await this.prismaService.projects.delete({ where: { id: projectId } });
      await deleteFile(project.cover);

      this.logger.log(`[ProjectService - ${new Date().toLocaleString()}] Project ${projectId} deleted.`)

      return right();
    } catch (err) {
      this.logger.error(`[ProjectService - ${new Date().toLocaleString()}] `, err);
      return left(new BadRequestException('Não foi possível deletar projeto.'));
    }
  }

  async updateProject(
    projectId: string, payload: Partial<UpdateProjectDto>,
  ): Promise<Either<Error | ProjectNotFound | BadRequestException, ProjectEntity>> {
    try {
      const project = await this.prismaService.projects.findFirst({
        where: { id: projectId },
        include: { members: true }
      });

      if (!project) return left(new ProjectNotFound());

      if (payload.cover == '' || null) await deleteFile(project.cover);

      const membersToConnect = payload.members
        ? payload.members.map((id) => ({ id: id }))
        : [];

      const membersToDisconnect = project.members
        .filter((member) => !payload.members?.includes(member.id))
        .map(({ id }) => ({ id: id }))

      const updatedProject = await this.prismaService.projects.update({
        where: { id: projectId },
        data: {
          id: project.id,
          ...payload,
          technologies: payload.technologies != project.technologies && payload.technologies,
          members: {
            connect: membersToConnect,
            disconnect: membersToDisconnect,
          },
        },
        include: {
          members: true
        }
      });

      if (payload.members && payload.members.length > 0) {
        for (const memberId of payload.members) {
          await this.prismaService.member.update({
            where: { id: memberId },
            data: {
              projects: {
                connect: { id: projectId },
              },
            },
          });
        }
      }

      // Desconecta os membros removidos do projeto
      for (const member of membersToDisconnect) {
        await this.prismaService.member.update({
          where: { id: member.id },
          data: {
            projects: {
              disconnect: { id: projectId },
            },
          },
        });
      }

      this.logger.log(`[ProjectService - ${new Date().toLocaleString()}] Project ${updatedProject.name} updated.`)

      return right(updatedProject);
    } catch (err) {
      this.logger.error(`[ProjectService - ${new Date().toLocaleString()}] `, err);
      return left(new BadRequestException(`Não foi possível atualizar projeto.`));
    }
  }
}
