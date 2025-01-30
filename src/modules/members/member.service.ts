import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Member } from './schema/Member';
import { MemberDto } from './dto/Member.dto';
import { ResponseMember } from './dto/ResponseMember.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { deleteFile } from '../shared/deleteFiles';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) {}

  async create(memberDto: MemberDto): Promise<Member> {
    try {
      const memberFormat: Member = {
        _id: uuidv4(),
        name: memberDto.name,
        profileImage: memberDto.profileImage,
        stack: memberDto.stack,
        communityLevel: memberDto.communityLevel,
        currentSquad: memberDto.currentSquad,
        professionalProfile: memberDto.professionalProfile,
        platform: memberDto.platform,
        skills: memberDto.skills,
        projects: [],
        softSkills: memberDto.softSkills,
      };
      const createMember = new this.memberModel(memberFormat);
      const member = await createMember.save();
      return member;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Member> {
    try {
      const member = await this.memberModel.findById({ _id: id });
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
      const member = await this.findOne(id);
      await deleteFile(member.profileImage);
      await Promise.all(
        member.projects.map(async (p) => {
          await deleteFile(p.projectCover);
        }),
      );
      await this.memberModel.deleteOne({ _id: id });
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  }

  async update(id: string, payload: UpdateMemberDto): Promise<Member> {
    const memberExists = await this.findOne(id);

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

    await this.memberModel.updateOne({ _id: id }, { $set: memberExists });
    return memberExists;
  }

  async findAll(): Promise<ResponseMember[]> {
    try {
      return (await this.memberModel.find()).map((m) => new ResponseMember(m));
    } catch (error) {
      throw new Error(
        'Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.',
      );
    }
  }
}
