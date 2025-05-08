import {
  HttpProjectEntity,
  ProjectEntity,
} from 'src/entities';

export class DomainProjectMapper {
  static toDomain(project: HttpProjectEntity): ProjectEntity {
    return {
      id: project.id,
      name: project.name,
      cover: project.cover,
      description: project.description,
      url: project.url,
      technologies: project.technologies,
      createdAt: project.created_at,
      members: project.members
    };
  }

  static ArrayToDomain(projects: HttpProjectEntity[]): ProjectEntity[] | [] {
    if (projects.length === 0) return [];

    return projects.map((project) => this.toDomain(project));
  }
}
