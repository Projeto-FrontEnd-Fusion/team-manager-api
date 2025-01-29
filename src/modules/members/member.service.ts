import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Member } from './schema/Member';
import { MemberDto } from './dto/Member.dto';
import { ResponseMember } from './dto/ResponseMember.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { convertToArray } from './util/convertToArray';
import { deleteFile } from '../shared/deleteFiles';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
  ) {}

  async create(memberDto: MemberDto): Promise<Member> {
    try {
      const memberFormat: Member = {
        _id: uuidv4(),
        name: memberDto.name,
        profileImage: memberDto.profileImage,
        stack: memberDto.stack,
        communityLevel: memberDto.communityLevel,
        currentSquad: memberDto.currentSquad,
        professionalProfile: convertToArray(memberDto.professionalProfile),
        platform: convertToArray(memberDto.platform),
        skills: convertToArray(memberDto.skills),
        projects: [],
        softSkills: convertToArray(memberDto.softSkills),
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

  async update(id: string, updates: UpdateMemberDto): Promise<Member> {
    const memberExists = await this.findOne(id);

    if (
      updates.profileImage &&
      updates.profileImage !== memberExists.profileImage
    ) {
      await deleteFile(memberExists.profileImage);
    }

    if (updates.profileImage) {
      memberExists.profileImage = updates.profileImage;
    }

    if (updates.stack && updates.stack !== '') {
      memberExists.stack = updates.stack;
    }

    if (updates.communityLevel && updates.communityLevel !== '') {
      memberExists.communityLevel = updates.communityLevel;
    }

    if (updates.currentSquad && updates.currentSquad !== '') {
      memberExists.currentSquad = updates.currentSquad;
    }

    if (updates.professionalProfile && updates.professionalProfile.length > 0) {
      memberExists.professionalProfile = convertToArray(
        updates.professionalProfile,
      );
    }

    if (updates.platform && updates.platform.length > 0) {
      memberExists.platform = convertToArray(updates.platform);
    }

    if (updates.skills && updates.skills.length > 0) {
      memberExists.skills = convertToArray(updates.skills);
    }

    if (updates.softSkills && updates.softSkills.length > 0) {
      memberExists.softSkills = convertToArray(updates.softSkills);
    }

    if (updates.name && updates.name !== '') {
      memberExists.name = updates.name;
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
