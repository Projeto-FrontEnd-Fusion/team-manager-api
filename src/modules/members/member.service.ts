import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Member, MemberDocument } from "./schema/Member";
import { Model } from "mongoose";
import { create } from "domain";
import { MemberDto } from "./dto/Member.dto";
import { ResponseMember } from "./dto/ResponseMember.dto";
import { UpdateMemberDto } from "./dto/UpdateMember.dto";

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private readonly memberModel: Model<Member>) { }

  async create(memberDto: MemberDto): Promise<ResponseMember> {
    try {
      const createMember = new this.memberModel(memberDto);
      const user = await createMember.save();
      return new ResponseMember(user.id, createMember)
    } catch (error) {
      console.error("Erro ao criar membro:", error);
      throw error;
    }
  }


  async findOne(id: string): Promise<ResponseMember> {
    try {
      const user = await this.memberModel.findById({ _id: id })
      if (!user) {
        throw new BadRequestException('Usuário não encontrado.')
      }
      return new ResponseMember(user.id, user)
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.findOne(id)

      await this.memberModel.deleteOne({ _id: id });
    } catch (error) {
      console.error("Erro ao criar membro:", error);
      throw error;
    }
  }


  async update(id: string, updates: UpdateMemberDto) {
    await this.findOne(id)
    const member = new Member()
    const updateMember = Object.assign(member, updates)

    const update = await this.memberModel.updateOne(
      { _id: id },
      { $set: updateMember },
    )
    return update
  }


  async findAll(): Promise<ResponseMember[]> {
    try {
      return (await this.memberModel.find()).map(
        m => new ResponseMember(m.id, m)
      )
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os membros. Tente novamente mais tarde.');
    }
  }

}