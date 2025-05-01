import {
  HttpMemberEntity,
  HttpProjectEntity,
  ProjectEntity,
} from 'src/entities';
import { DomainMemberMapper } from './domain-member.mapper';

export class DomainProjectMapper {
  static toDomain(project: HttpProjectEntity): ProjectEntity {
    return {
      id: project.id,
      cover: project.project_cover,
      name: project.project_name,
      description: project.description,
      url: project.projectUrl,
      technologies: project.technologies,
      members:
        project.members &&
        project.members.length > 0 &&
        DomainMemberMapper.ArrayToDomain(project.members as HttpMemberEntity[]),
      createdAt: project.created_at,
    };
  }

  static ArrayToDomain(projects: HttpProjectEntity[]): ProjectEntity[] | [] {
    if (projects.length === 0) return [];

    return projects.map((project) => this.toDomain(project));
  }
}
