import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { Member } from '@entity/Member';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';

jest.mock('../shared/deleteFiles');

describe('MemberService', () => {
  let service: MemberService;
  let repository: Repository<Member>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repository = module.get<Repository<Member>>(getRepositoryToken(Member));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return an array of members', async () => {
      const members: Member[] = [{ id: '1', name: 'John Doe' } as Member];
      jest.spyOn(repository, 'find').mockResolvedValue(members);

      expect(await service.findMany()).toEqual(members);
    });

    it('should throw an error if repository fails', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Error'));

      await expect(service.findMany()).rejects.toThrow(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      );
    });
  });

  describe('create', () => {
    it('should create a new member', async () => {
      const payload: CreateMemberDto = { name: 'John Doe' } as CreateMemberDto;
      const member: Member = { id: '1', name: 'John Doe' } as Member;
      jest.spyOn(repository, 'create').mockReturnValue(member);
      jest.spyOn(repository, 'save').mockResolvedValue(member);

      expect(await service.create(payload)).toEqual(member);
    });
  });

  describe('findById', () => {
    it('should return a member by id', async () => {
      const member: Member = { id: '1', name: 'John Doe' } as Member;
      jest.spyOn(repository, 'findOne').mockResolvedValue(member);

      expect(await service.findById('1')).toEqual(member);
    });

    it('should throw BadRequestException if member not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete a member by id', async () => {
      const member: Member = {
        id: '1',
        profileImage: 'image.jpg',
        projects: [],
      } as Member;
      jest.spyOn(service, 'findById').mockResolvedValue(member);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.delete('1');
      expect(deleteFile).toHaveBeenCalledWith('image.jpg');
      expect(repository.delete).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update a member', async () => {
      const member: Member = { id: '1', name: 'John Doe' } as Member;
      const payload: UpdateCreateMemberDto = {
        name: 'Jane Doe',
      } as UpdateCreateMemberDto;
      jest.spyOn(service, 'findById').mockResolvedValue(member);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      const updatedMember = await service.update('1', payload);
      expect(updatedMember.name).toEqual('Jane Doe');
      expect(repository.update).toHaveBeenCalledWith({ id: '1' }, updatedMember);
    });
  });
});
