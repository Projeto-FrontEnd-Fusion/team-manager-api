import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/UpdateMember.dto';

const mockMemberService = {
  create: jest.fn(async (dto) => {
    return { id: Date.now().toString(), ...dto };
  }),
  findMany: jest.fn(async () => {
    return [
      {
        id: '1',
        name: 'John Doe',
        profileImage: 'path/to/image',
        professionalProfiles: [
          { platform: 'GitHub', url: 'https://github.com/johndoe' },
        ],
      },
    ];
  }),
  findById: jest.fn(async () => {
    return {
      id: '1',
      name: 'John Doe',
      profileImage: 'path/to/image',
      professionalProfiles: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      ],
    };
  }),
  update: jest.fn(async (id, dto) => {
    return { id, ...dto };
  }),
  delete: jest.fn(async () => {
    return;
  }),
};

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

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

  describe('create', () => {
    it('should create a member', async () => {
      const dto: CreateMemberDto = {
        name: 'John Doe',
        profileImage: '',
        stack: 'Full Stack',
        communityLevel: 'Senior',
        currentSquad: 'Eagles',
        hardSkills: ['1', '2'],
        softSkills: ['1', '2'],
        userId: '1',
        professionalProfiles: [
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/seunome',
          },
        ],
        projects: [],
      };

      const result = await controller.createMember(dto);

      expect(result).toEqual({
        id: expect.any(String),
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith({
        ...dto,
      });
    });
  });

  describe('findMany', () => {
    it('should return all members', async () => {
      const result = await controller.findManyMembers();

      expect(service.findMany).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: '1',
          name: 'John Doe',
          profileImage: 'path/to/image',
          professionalProfiles: [
            { platform: 'GitHub', url: 'https://github.com/johndoe' },
          ],
        },
      ]);
    });
  });

  describe('findById', () => {
    it('should return a member by id', async () => {
      const result = await controller.findMemberById('1');

      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        id: '1',
        name: 'John Doe',
        profileImage: 'path/to/image',
        professionalProfiles: [
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
        ],
      });
    });

    it('should throw BadRequestException if error in findById', async () => {
      jest
        .spyOn(service, 'findById')
        .mockRejectedValueOnce(
          new BadRequestException(
            'Ocorreu um erro ao buscar membro. Tente novamente mais tarde',
          ),
        );

      await expect(controller.findMemberById('2')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a member', async () => {
      const dto: UpdateMemberDto = {
        name: 'John Doe',
        profileImageUrl: '',
      };
      const file = { path: 'path/to/image' } as Express.Multer.File;

      const result = await controller.updateMember('1', dto, file);

      expect(result).toEqual({ id: '1', ...dto, profileImage: file.path });
      expect(service.update).toHaveBeenCalledWith('1', {
        ...dto,
        profileImage: file.path,
      });
    });
  });

  describe('delete', () => {
    it('should delete a member', async () => {
      await controller.deleteMember('1');

      expect(service.delete).toHaveBeenCalledWith('1');
    });
  });
});
