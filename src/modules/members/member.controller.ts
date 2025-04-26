import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  MemberRequestTransformInterceptor,
  MemberResponseTransformInterceptor,
} from '@interceptors/index';
import { CreateMemberDto } from './dto/CreateMember.dto';
import { HttpMemberMapper } from '@mappers/HttpToDomain';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { multerConfig } from '@configs/multer.config';

@ApiTags('Members')
@Controller('members')
@UseInterceptors(MemberResponseTransformInterceptor)
export class MemberController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly memberService: MemberService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', multerConfig('member')),
    MemberRequestTransformInterceptor,
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateMemberDto,
  })
  async createMember(
    @Body() data: CreateMemberDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addMaxSizeValidator({ maxSize: 2048 }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) data.profileImage = file.path;
    return await this.memberService.create(data, file);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllMembers() {
    const result = await this.memberService.findMany();
    return HttpMemberMapper.ArrayToHttp(result);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findMemberById(@Param('id') id: string) {
    try {
      const result = await this.memberService.findById(id);
      return HttpMemberMapper.toHttp(result);
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
  async updateMember(
    @Param('id') id: string,
    @Body() payload: UpdateCreateMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        payload.profileImageUrl = file.path;
      }
      const result = await this.memberService.update(id, payload, file);
      return HttpMemberMapper.toHttp(result);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteMember(@Param('id') id: string): Promise<void> {
    try {
      return await this.memberService.delete(id);
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      throw error;
    }
  }

  @Delete(':memberId/projects/:projectId')
  @HttpCode(HttpStatus.OK)
  async deleteMemberFromProject(
    @Param('memberId') memberId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.memberService.deleteMemberFromProject(memberId, projectId);
  }
}
