import { Test, TestingModule } from '@nestjs/testing';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { v4 as uuidv4 } from 'uuid';

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

  const mockMemberService = {
    create: jest.fn(async (dto) => {
      return {
        id: Date.now().toString(),
        ...dto,
      };
    }),
    findMany: jest.fn(async () => {
      return [
        {
          id: '1',
          name: 'John Doe',
          profileImage: 'path/to/image',
          professionalProfile: [
            { platform: 'GitHub', url: 'https://github.com/johndoe' },
          ],
        },
      ];
    }),
    findById: jest.fn(async (id) => {
      return {
        id,
        name: 'John Doe',
        profileImage: 'path/to/image',
        professionalProfile: [
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
        ],
      };
    }),
    update: jest.fn(async (id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    delete: jest.fn(async () => {
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: mockMemberService,
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a member', async () => {
    const dto: CreateMemberDto = {
      name: 'John Doe',
      profileImage: '',
      stack: 'Full Stack',
      communityLevel: 'Senior',
      currentSquad: 'Eagles',
      skills: ['Java', 'JavaScript'],
      softSkills: ['Comunicativo', 'Atencioso', 'Prestativo'],
      professionalProfile: [
        {
          id: uuidv4(),
          platform: 'linkedin',
          url: 'https://linkedin.com/seunome',
          member: null, // O TypeORM associará o `member` automaticamente
          createdAt: new Date().toISOString(),
        },
      ],
    };
    const file = { path: 'path/to/image' } as Express.Multer.File;

    const result = await controller.create(file, dto);

    expect(result).toEqual({
      id: expect.any(String),
      ...dto,
      profileImage: file.path,
    });
    expect(service.create).toHaveBeenCalledWith({
      ...dto,
      profileImage: file.path,
    });
  });

  it('should return all members', async () => {
    const result = await controller.findAll();

    expect(result).toEqual([
      {
        id: '1',
        name: 'John Doe',
        profileImage: 'path/to/image',
        professionalProfile: [{ platform: 'GitHub', url: 'https://github.com/johndoe' }],
      },
    ]);
    expect(service.findMany).toHaveBeenCalled();
  });

  it('should return a member by id', async () => {
    const result = await controller.findById('1');

    expect(result).toEqual({
      id: '1',
      name: 'John Doe',
      profileImage: 'path/to/image',
      professionalProfile: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      ],
    });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should update a member', async () => {
    const dto: UpdateCreateMemberDto = { name: 'John Doe', profileImage: '' };
    const file = { path: 'path/to/image' } as Express.Multer.File;

    const result = await controller.update('1', dto, file);

    expect(result).toEqual({ id: '1', ...dto, profileImage: file.path });
    expect(service.update).toHaveBeenCalledWith('1', { ...dto, profileImage: file.path });
  });

  it('should delete a member', async () => {
    await controller.delete('1');

    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
