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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberService } from './member.service';
import { UpdateCreateMemberDto } from './dto/UpdateMember.dto';
import { multerConfig } from '@configs/multer.config';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './statics/uploads/member',
        filename: (req, file, cb) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
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

    return await this.memberService.create(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllMembers() {
    return await this.memberService.findMany();
  }

  @Get(':memberId')
  @HttpCode(HttpStatus.OK)
  async findMemberById(@Param('memberId') memberId: string) {
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
  async updateMember(
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
  async deleteMember(@Param('id') id: string): Promise<void> {
    try {
      await this.memberService.delete(id);
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
