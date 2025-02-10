import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { MemberService } from './member.service';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
// import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '@modules/shared/deleteFiles';

jest.mock('@modules/shared/deleteFiles');

describe('MemberService', () => {
  let service: MemberService;
  let prismaService: PrismaService;
  let member;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.spyOn(prismaService.member, 'create').mockImplementation(jest.fn());
    jest.spyOn(prismaService.member, 'findFirst').mockImplementation(jest.fn());
    jest.spyOn(prismaService.member, 'findMany').mockImplementation(jest.fn());
    jest.spyOn(prismaService.member, 'delete').mockImplementation(jest.fn());
    jest.spyOn(prismaService.member, 'update').mockImplementation(jest.fn());

    member = {
      name: 'John Doe',
      profileImage: '',
      stack: 'Full Stack',
      communityLevel: 'Senior',
      currentSquad: 'Eagles',
      skills: [],
      softSkills: [],
      projects: [],
      professionalProfiles: [
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/seunome',
        },
      ],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new member', async () => {
      jest.spyOn(prismaService.member, 'create').mockResolvedValue(member);

      const response = await service.create(member);

      expect(response).toBeDefined();
      expect(prismaService.member.create).toHaveBeenCalled();
      expect(response.name).toBe('John Doe');
    });

    it('should throw an error if creation fails', async () => {
      const payload = { name: 'John Doe' };
      (prismaService.member.create as jest.Mock).mockRejectedValue(new Error('Error'));

      await expect(service.create(payload)).rejects.toThrow(Error);
    });

    describe('findById', () => {
      it('should return a member by id', async () => {
        const member = {
          id: '1',
          name: 'John Doe',
        };
        (prismaService.member.findFirst as jest.Mock).mockResolvedValue(member);

        expect(await service.findById('1')).toEqual(member);
      });

      it('should throw BadRequestException if member not found', async () => {
        (prismaService.member.findFirst as jest.Mock).mockResolvedValue(null);

        await expect(service.findById('1')).rejects.toThrow(BadRequestException);
      });
    });

    describe('findMany', () => {
      it('should return an array of members', async () => {
        const members = [{ id: '1', name: 'John Doe' }];
        (prismaService.member.findMany as jest.Mock).mockResolvedValue(members);

        expect(await service.findMany()).toEqual(members);
      });

      it('should throw an error if repository fails', async () => {
        (prismaService.member.findMany as jest.Mock).mockRejectedValue(
          new Error('Error'),
        );

        await expect(service.findMany()).rejects.toThrow(
          'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
        );
      });
    });

    describe('delete', () => {
      it('should delete a member by id', async () => {
        const member = {
          id: '1',
          name: '',
          stack: '',
          communityLevel: '',
          currentSquad: '',
          createdAt: '',
          profileImage: 'image.jpg',
        };
        jest.spyOn(prismaService.member, 'findFirst').mockResolvedValue(member);
        jest.spyOn(prismaService.member, 'delete').mockResolvedValue(undefined);
        (deleteFile as jest.Mock).mockResolvedValue(undefined);

        await service.delete('1');

        expect(deleteFile).toHaveBeenCalledWith('image.jpg');
        expect(prismaService.member.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      });
    });

    describe('update', () => {
      it('should update a member', async () => {
        const payload = {
          name: 'Jane Doe',
          profileImage: 'image.jpg',
        };
        jest.spyOn(prismaService.member, 'findFirst').mockResolvedValue(member);
        jest.spyOn(prismaService.member, 'update').mockResolvedValue({ ...member });

        const updatedMember = await service.update('1', payload);

        expect(deleteFile).toHaveBeenCalledWith('image.jpg');
        expect(prismaService.member.update).toHaveBeenCalledWith({
          where: { id: '1' },
          data: { ...member },
        });
        expect(updatedMember.name).toEqual('Jane Doe');
      });
    });
  });
});
