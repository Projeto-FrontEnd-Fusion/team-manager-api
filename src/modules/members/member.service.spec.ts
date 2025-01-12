import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberDto } from './dto/Member.dto';
import { ResponseMember } from './dto/ResponseMember.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { mapperToPlatformUrl } from './util/mapperToPlataformUrl';
import { Member } from './schema/Member';
import { v4 as uuidv4 } from 'uuid';
import { ProfissionalProfileResponse } from './dto/ProfileResponse.dto';

describe('MemberController', () => {
  let controller: MemberController;
  let service: MemberService;

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
      const memberDto: MemberDto = {
        name: 'John Doe',
        stack: 'Fullstack',
        communityLevel: 'Senior',
        professionalProfile: ['url'],
        platform: ['linkedin'],
        currentSquad: 'Alpha Squad',
        skills: ['JavaScript', 'TypeScript'],
        softSkills: ['Communication', 'Teamwork'],
      };

      const responseMember: ResponseMember = {
        id: '12345',
        name: memberDto.name,
        stack: memberDto.stack,
        community_level: memberDto.communityLevel,
        current_squad: memberDto.currentSquad,
        skills: memberDto.skills,
        soft_skills: memberDto.softSkills,
        professional_profile_url: mapperToPlatformUrl(memberDto as Member)
      };

      jest.spyOn(service, 'create').mockResolvedValue(responseMember);

      const result = await controller.create(memberDto);

      expect(service.create).toHaveBeenCalledWith(memberDto);
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
          professional_profile_url: [new ProfissionalProfileResponse("github", "url")],
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
      const member: ResponseMember = {
        id: memberId,
        name: 'John Doe',
        stack: 'Fullstack',
        professional_profile_url: [new ProfissionalProfileResponse("github", "url")],
        community_level: 'Senior',
        current_squad: 'Alpha Squad',
        skills: ['JavaScript', 'TypeScript'],
        soft_skills: ['Communication', 'Teamwork'],
      };

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
        professionalProfile: ['url'],
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
      const id = '12345';

      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      await controller.delete(id);

      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
