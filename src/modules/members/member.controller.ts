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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  MemberRequestTransformInterceptor,
  MemberResponseTransformInterceptor,
} from '@interceptors/index';
import { CreateMemberDto } from './dto/CreateMember.dto';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { multerConfig } from '@configs/multer.config';
import { AuthGuard } from '@modules/auth/auth.guard';

@ApiTags('Members')
@Controller('members')
@UseInterceptors(MemberResponseTransformInterceptor)
export class MemberController {
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
      new ParseFilePipeBuilder().addMaxSizeValidator({ maxSize: 4000 }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log(file)
    if (file) data.profileImage = file.path;
    const result = await this.memberService.create(data, file);

    if (result.isLeft())
      return {
        data: null,
        message: result.value.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findManyMembers() {
    const result = await this.memberService.findMany();

    if (result.isLeft())
      return {
        data: null,
        message: result.value.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findMemberById(@Param('id') id: string) {
    const result = await this.memberService.findById(id);

    if (result.isLeft())
      return {
        data: null,
        message: result.value.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig('member')))
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateMemberDto,
  })
  async updateMember(
    @Param('id') id: string,
    @Body() payload: UpdateMemberDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      payload.profileImageUrl = file.path;
    }
    const result = await this.memberService.update(id, payload, file);

    if (result.isLeft())
      return {
        data: null,
        message: result.value.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteMember(@Param('id') id: string) {
    const result = await this.memberService.delete(id);

    if (result.isLeft())
      return {
        data: null,
        message: result.value.message,
        statusCode: HttpStatus.OK,
      };

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':memberId/projects/:projectId')
  @HttpCode(HttpStatus.OK)
  async deleteMemberFromProject(
    @Param('memberId') memberId: string,
    @Param('projectId') projectId: string,
  ) {
    const result = await this.memberService.deleteMemberFromProject(
      memberId,
      projectId,
    );

    if (result.isLeft()) {
      return {
        data: result.value,
        message: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK,
    };
  }
}
