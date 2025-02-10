import { InMemoryMemberRepository } from './in-memory-member.repository';
import { Project } from '@entity/Project';

export class InMemoryProjectRepository {
  public responseProject: Project[] = [
    {
      id: '12345',
      description: '',
      members: [new InMemoryMemberRepository().responseMember[1]],
      projectCover: '',
      projectName: '',
      projectUrl: '',
      technologies: [],
      createdAt: new Date().toISOString(),
    },
  ];

  async create(payload: Project): Promise<void> {
    this.responseProject.push(payload);
  }

  async save(item: Project): Promise<void> {
    const index = this.responseProject.findIndex(({ id }) => id === item.id);
    this.responseProject[index] = item;
  }

  async findById(itemId: string): Promise<Project | null> {
    return this.responseProject.find(({ id }) => id === itemId) ?? null;
  }

  async findAll(): Promise<Project[] | []> {
    return this.responseProject;
  }

  async remove(itemId: string): Promise<void> {
    this.responseProject = this.responseProject.filter(({ id }) => id !== itemId);
  }
}
