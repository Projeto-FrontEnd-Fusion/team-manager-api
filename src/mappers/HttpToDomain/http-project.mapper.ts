import { HttpProjectEntity, ProjectEntity } from 'src/entities';

export class HttpProjectMapper {
  static toHttp(project: ProjectEntity): HttpProjectEntity {
    return {
      id: project.id,
      project_cover: project.cover,
      project_name: project.name,
      description: project.description,
      projectUrl: project.url,
      technologies: project.technologies.split(',').map((t) => t.trim()),
      members: project.members.map((member) => {
        return {
          id: member.id,
          name: member.name,
        };
      }),
      created_at: project.createdAt,
    };
  }

  static ArrayToHttp(projects: ProjectEntity[]): HttpProjectEntity[] {
    return projects.map((project) => this.toHttp(project));
  }
}
