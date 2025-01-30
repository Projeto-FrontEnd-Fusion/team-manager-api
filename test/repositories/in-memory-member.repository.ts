import { v4 as uuidv4 } from 'uuid';

import { ProfissionalProfileResponse } from '@modules/members/dto/ProfileResponse.dto';
import { ResponseMember } from '@modules/members/dto/ResponseMember.dto';
import { ResponseProjectDto } from '@modules/project/dto/ResponseProject.dto';

export class InMemoryMemberRepository {
  public responseMember: ResponseMember[] = [
    {
      id: uuidv4(),
      name: 'John Doe',
      stack: 'Fullstack',
      community_level: 'Senior',
      current_squad: 'Alpha Squad',
      skills: ['JavaScript', 'TypeScript'],
      soft_skills: ['Communication', 'Teamwork'],
      professional_profile_url: [new ProfissionalProfileResponse('github', 'url')],
      projects: [
        new ResponseProjectDto({
          _id: '12345',
          projectName: 'Team Manager API',
          projectCover: 'cover.jpg',
          description: 'Team Managar API dos Vingadores',
          technologies: ['typescript', 'nestjs'],
          projectUrl: 'www.teammanagarapi.vingadores.com.br',
        }),
      ],
      profile_image: 'image.jpg',
    },
  ];

  async create(responseMember: ResponseMember): Promise<void> {
    this.responseMember.push(responseMember);
  }

  async save(item: ResponseMember): Promise<void> {
    const index = this.responseMember.findIndex(({ id }) => id === item.id);
    this.responseMember[index] = item;
  }

  async findById(itemId: string): Promise<ResponseMember | null> {
    return this.responseMember.find(({ id }) => id === itemId) ?? null;
  }

  async findAll(): Promise<ResponseMember[] | []> {
    return this.responseMember;
  }

  async remove(itemId: string): Promise<void> {
    this.responseMember = this.responseMember.filter(({ id }) => id !== itemId);
  }
}
