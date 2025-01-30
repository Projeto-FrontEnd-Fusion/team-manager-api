import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MemberDto } from './dto/Member.dto';
import { MemberService } from './member.service';
import { ResponseMember } from './dto/ResponseMember.dto';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
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
    type: MemberDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: MemberDto,
  ): Promise<ResponseMember> {
    try {
      data.profileImage = file.path;
      return new ResponseMember(await this.memberService.create(data));
    } catch (error) {
      throw error;
    }
  }

  @Get('/find-all')
  @HttpCode(200)
  async findAll(): Promise<ResponseMember[]> {
    try {
      return await this.memberService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ResponseMember> {
    try {
      return new ResponseMember(await this.memberService.findOne(id));
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig('member')))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateMemberDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updates: UpdateMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ResponseMember> {
    try {
      if (file) {
        updates.profileImage = file.path;
      }
      return new ResponseMember(await this.memberService.update(id, updates));
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.memberService.delete(id);
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  }
}
