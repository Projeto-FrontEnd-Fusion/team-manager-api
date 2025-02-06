import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { Member } from '@entity/Member';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findMany(): Promise<Member[]> {
    try {
      return await this.memberRepository.find();
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      );
    }
  }

  async create(payload: CreateMemberDto): Promise<Member> {
    try {
      const newMember: Member = {
        id: uuidv4(),
        name: payload.name,
        profileImage: payload.profileImage,
        stack: payload.stack,
        communityLevel: payload.communityLevel,
        currentSquad: payload.currentSquad,
        professionalProfile: payload.professionalProfile,
        platform: payload.platform,
        skills: payload.skills,
        projects: [],
        softSkills: payload.softSkills,
        createdAt: new Date().toISOString(),
      };
      const createMember = this.memberRepository.create(newMember);
      return await this.memberRepository.save(createMember);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Member> {
    try {
      const member = await this.memberRepository.findOne({ where: { id: id } });
      if (!member) {
        throw new BadRequestException('Usuário não encontrado.');
      }
      return member;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const member = await this.findById(id);
      await deleteFile(member.profileImage);
      await Promise.all(
        member.projects.map(async (p) => {
          await deleteFile(p.projectCover);
        }),
      );
      await this.memberRepository.delete({ id: id });
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  }

  async update(id: string, payload: UpdateCreateMemberDto): Promise<Member> {
    const memberExists = await this.findById(id);

    if (payload.profileImage && payload.profileImage !== memberExists.profileImage) {
      await deleteFile(memberExists.profileImage);
    }

    memberExists.profileImage = payload.profileImage || memberExists.profileImage;

    if (payload.stack && payload.stack !== '') {
      memberExists.stack = payload.stack;
    }

    if (payload.communityLevel && payload.communityLevel !== '') {
      memberExists.communityLevel = payload.communityLevel;
    }

    if (payload.currentSquad && payload.currentSquad !== '') {
      memberExists.currentSquad = payload.currentSquad;
    }

    memberExists.professionalProfile =
      payload.professionalProfile || memberExists.professionalProfile;

    if (payload.platform && payload.platform.length > 0) {
      memberExists.platform = payload.platform;
    }

    if (payload.skills && payload.skills.length > 0) {
      memberExists.skills = payload.skills;
    }

    if (payload.softSkills && payload.softSkills.length > 0) {
      memberExists.softSkills = payload.softSkills;
    }

    if (payload.name && payload.name !== '') {
      memberExists.name = payload.name;
    }

    await this.memberRepository.update({ id: id }, memberExists);
    return memberExists;
  }
}
