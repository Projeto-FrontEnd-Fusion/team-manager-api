import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schema/Project';
import { v4 as uuidv4 } from 'uuid';

import { CreateProjectDto } from './dto/Project.dto';
import { Member } from '../members/schema/Member';
import { MemberService } from '../members/member.service';
import { convertToArray } from '../members/util/convertToArray';
import { deleteFile } from '../shared/deleteFiles';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    private readonly memberService: MemberService,
  ) {}

  async addProject(memberId: string, data: CreateProjectDto) {
    try {
      const member = await this.memberService.findOne(memberId);
      const newProject: Project = {
        _id: uuidv4(),
        projectName: data.projectName,
        projectCover: data.projectCover,
        description: data.description,
        technologies: convertToArray(data.technologies),
        projectUrl: data.projectUrl,
      };
      member.projects.push(newProject);
      await this.memberModel.updateOne({ _id: memberId }, { $set: member });
    } catch {
      throw Error();
    }
  }

  async removeProject(projectId: string, memberId: string): Promise<boolean> {
    try {
      const member = await this.memberService.findOne(memberId);
      if (!member) {
        new BadRequestException('Usuário não encontrado.');
      }
      const project = member.projects.find((p) => p._id === projectId);
      await deleteFile(project.projectCover);
      member.projects = member.projects.filter((p) => p._id !== projectId);

      await this.memberModel.updateOne({ _id: memberId }, { $set: member });
      return true;
    } catch {
      return false;
    }
  }
}
