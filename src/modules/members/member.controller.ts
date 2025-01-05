import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MemberDto } from "./dto/Member.dto";
import { Member } from "./schema/Member";
import { MemberService } from "./member.service";
import { error } from "console";
import { ResponseMember } from "./dto/ResponseMember.dto";
import { UpdateMemberDto } from "./dto/UpdateMember.dto";

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) { }
  @Post()
  @HttpCode(201)
  async create(@Body() memberDto: MemberDto): Promise<ResponseMember> {
    try {
      return await this.memberService.create(memberDto)

    } catch (error) {
      throw error;
    }
  }
  @Get("/find-all")
  @HttpCode(200)
  async findAll(): Promise<ResponseMember[]> {
    try {
      return await this.memberService.findAll()
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ResponseMember> {
    try {
      return await this.memberService.findOne(id)
    } catch (error) {
      throw error;
    }
  }
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updates: UpdateMemberDto): Promise<void> {
    try {
      console.log(id)
      await this.memberService.update(id, updates)
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.memberService.delete(id)
    } catch (error) {
      console.error("Erro ao criar membro:", error);
      throw error;
    }
  }



}