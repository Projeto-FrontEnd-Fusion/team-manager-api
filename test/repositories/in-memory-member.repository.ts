export class InMemoryMemberRepository {
  public responseMember = [
    {
      id: '1',
      name: 'John Doe',
      stack: 'Fullstack',
      communityLevel: 'Senior',
      currentSquad: 'Alpha Squad',
      skills: ['JavaScript', 'TypeScript'],
      softSkills: ['Communication', 'Teamwork'],
      professionalProfile: [],
      projects: [
        {
          id: '12345',
          projectName: 'Team Manager API',
          projectCover: 'cover.jpg',
          description: 'Team Managar API dos Vingadores',
          technologies: ['typescript', 'nestjs'],
          projectUrl: 'www.teammanagarapi.vingadores.com.br',
          members: [],
          createdAt: new Date().toISOString(),
        },
      ],
      profileImage: 'image.jpg',
      createdAt: new Date().toISOString(),
    },
  ];

  async create(payload): Promise<void> {
    this.responseMember.push(payload);
  }

  async save(item): Promise<void> {
    const index = this.responseMember.findIndex(({ id }) => id === item.id);
    this.responseMember[index] = item;
  }

  async findById(itemId: string) {
    return this.responseMember.find(({ id }) => id === itemId) ?? null;
  }

  async findAll() {
    return this.responseMember;
  }

  async remove(itemId: string): Promise<void> {
    this.responseMember = this.responseMember.filter(({ id }) => id !== itemId);
  }
}
