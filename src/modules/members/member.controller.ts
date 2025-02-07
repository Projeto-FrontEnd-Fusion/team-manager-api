import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { Member } from 'src/entity/Member';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { multerConfig } from '@configs/multer.config';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig('member')))
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateMemberDto,
  })
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateMemberDto) {
    try {
      data.profileImage = file.path;
      return await this.memberService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Member[]> {
    try {
      return await this.memberService.findMany();
    } catch (error) {
      throw error;
    }
  }

  @Get(':memberId')
  @HttpCode(200)
  async findById(@Param('memberId') memberId: string): Promise<Member> {
    try {
      return await this.memberService.findById(memberId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig('member')))
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateCreateMemberDto,
  })
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCreateMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        payload.profileImage = file.path;
      }
      return await this.memberService.update(id, payload);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.memberService.delete(id);
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  }
}
