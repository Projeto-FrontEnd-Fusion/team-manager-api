import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateProjectDto } from './dto/CreateProject.dto';

import { Project } from '@entity/Project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(projectData: CreateProjectDto) {
    try {
      const newProject = this.projectRepository.create({
        id: uuidv4(),
        projectName: projectData.projectName,
        description: projectData.description,
        projectUrl: projectData.projectUrl,
        projectCover: projectData.projectCover,
        technologies: projectData.technologies,
        createdAt: new Date().toISOString(),
        members: [],
      });

      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Erro ao criar projeto');
    }
  }

  async findMany(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['members'] });
  }

  async findById(projectId: string): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({ where: { id: projectId } });
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
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Não foi possível encontrar o projeto.');
    }
    await this.projectRepository.delete({ id: projectId });
  }

  async updateProject(projectId: string, payload: Partial<Project>) {
    const project = await this.projectRepository.findOne({
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

    await this.projectRepository.update({ id: project.id }, updatedProject);

    return updatedProject as Project;
  }
}
