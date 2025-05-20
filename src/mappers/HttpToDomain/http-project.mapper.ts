import { HttpProjectEntity, MemberEntity, ProjectEntity } from 'src/entities';
import { HttpMemberMapper } from './http-member.mapper';

export class HttpProjectMapper {
  static toHttp(project: ProjectEntity): HttpProjectEntity {

    return {
      id: project.id,
      cover: project.cover,
      name: project.name,
      description: project.description,
      url: project.url,
      technologies: project.technologies,
      created_at: project.createdAt,
      members: project.members && HttpMemberMapper.ArrayToHttp(project.members as MemberEntity[]),
    };
  }

  static ArrayToHttp(projects: ProjectEntity[]): HttpProjectEntity[] | [] {
    if (projects.length === 0) return [];
    return projects.map((project) => this.toHttp(project));
  }
}
