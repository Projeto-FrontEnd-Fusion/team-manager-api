import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { Member } from './schema/Member';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { ProfissionalProfileResponse } from './dto/ProfileResponse.dto';
import { ResponseMember } from './dto/ResponseMember.dto';
import { ResponseProjectDto } from '../project/dto/ResponseProject.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

  const member = {
    _id: '12345',
    name: 'John Doe',
    stack: 'Fullstack',
    communityLevel: 'Senior',
    professionalProfile: {
      platform: 'linkedin',
      url: 'https://linkedin.com/meu-perfil',
    },
    platform: ['linkedin'],
    currentSquad: 'Alpha Squad',
    skills: ['JavaScript', 'TypeScript'],
    softSkills: ['Communication', 'Teamwork'],
    file: { name: 'teste' },
    projects: [
      {
        _id: '12345',
        projectName: 'Team Manager API',
        projectCover: 'cover.jpg',
        description: 'Team Managar API dos Vingadores',
        technologies: ['typescript', 'nestjs'],
        projectUrl: 'www.teammanagarapi.vingadores.com.br',
      },
    ],
    profileImage: 'image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    service = module.get<MemberService>(MemberService);
  });

  describe('create', () => {
    it('should call service.create with the received MemberDto and return the result', async () => {
      const responseMember: Member = {
        _id: '12345',
        projects: [],
        name: member.name,
        profileImage: member.file.name,
        stack: member.stack,
        communityLevel: member.communityLevel,
        currentSquad: member.currentSquad,
        skills: member.skills,
        softSkills: member.softSkills,
        professionalProfile: member.professionalProfile,
        platform: member.platform,
      };

      jest.spyOn(service, 'create').mockResolvedValue(responseMember);

      // TODO: Fix Path
      const file = { path: 'path/to/file' } as Express.Multer.File;
      const result = await controller.create(file, member);

      expect(service.create).toHaveBeenCalledWith(member);
      expect(result).toEqual(responseMember);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      const responseMembers: ResponseMember[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(responseMembers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(responseMembers);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with the given id and return the result', async () => {
      const memberId = '60d0fe4f5311236168a109ca';

      jest.spyOn(service, 'findOne').mockResolvedValue(member);

      const result = await controller.findOne(memberId);

      expect(service.findOne).toHaveBeenCalledWith(memberId);
      expect(result).toEqual(member);
    });
  });

  describe('update', () => {
    it('should call service.update with the given id and UpdateMemberDto and return void', async () => {
      const id = '12345';
      const updateMemberDto: UpdateMemberDto = {
        name: 'John Updated',
        stack: 'Backend',
        communityLevel: 'Junior',
        professionalProfile: {
          platform: 'linkedin',
          url: 'https://linkedin.com/meu-perfil',
        },
        platform: ['platform'],
        currentSquad: 'Beta Squad',
        skills: ['Node.js', 'Express'],
        softSkills: ['Adaptability', 'Leadership'],
      };

      jest.spyOn(service, 'update').mockResolvedValue(undefined);

      await controller.update(id, updateMemberDto);

      expect(service.update).toHaveBeenCalledWith(id, updateMemberDto);
    });
  });

  describe('delete', () => {
    it('should call service.delete with the given id and return void', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);
      await controller.delete('12345');
      expect(service.delete).toHaveBeenCalledWith('12345');
    });
  });
});
