import { Project } from 'src/entity/Project';

export class ResponseProjectDto {
  id: string;
  project_name: string;
  project_cover: string;
  description: string;
  technologies: string[];
  projectUrl: string;

  constructor(project: Project) {
    this.id = project.id;
    this.project_name = project.projectName;
    this.project_cover = project.projectCover;
    this.description = project.description;
    this.technologies = project.technologies;
    this.projectUrl = project.projectUrl;
  }
}
