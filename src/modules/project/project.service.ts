import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateProjectDto } from './dto/CreateProject.dto';

import { Member } from 'src/entity/Member';
import { Project } from 'src/entity/Project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
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
    } catch (error) {}
  }

  async findMany(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['members'] });
  }

  async findById(projectId: string): Promise<Project> {
    return await this.projectRepository.findOne({ where: { id: projectId } });
  }

  // TODO: Create a way to delete images after delete a project
  async deleteById(projectId: string) {
    const deletedProject = await this.projectRepository.delete({ id: projectId });
    return deletedProject;
  }

  // async updateProject(projectId: string, payload: Partial<Project>) {
  //   const project = await this.projectRepository.findOne({ where: { id: projectId } });

  //   const data = payload;
  // }

  // Depracated
  // async addProject(memberId: string, data: CreateProjectDto) {
  //   try {
  //     const member = await this.memberService.findOne(memberId);
  //     const newProject: OldProject = {
  //       _id: uuidv4(),
  //       projectName: data.projectName,
  //       projectCover: data.projectCover,
  //       description: data.description,
  //       technologies: convertToArray(data.technologies),
  //       projectUrl: data.projectUrl,
  //     };
  //     member.projects.push(newProject);
  //     await this.memberModel.updateOne({ _id: memberId }, { $set: member });
  //   } catch {
  //     throw Error();
  //   }
  // }

  // async removeProject(projectId: string, memberId: string): Promise<boolean> {
  //   try {
  //     const member = await this.memberService.findOne(memberId);
  //     if (!member) {
  //       new BadRequestException('Usuário não encontrado.');
  //     }
  //     const project = member.projects.find((p) => p._id === projectId);
  //     await deleteFile(project.projectCover);
  //     member.projects = member.projects.filter((p) => p._id !== projectId);

  //     await this.memberModel.updateOne({ _id: memberId }, { $set: member });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
}
