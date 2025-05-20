import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/UpdateMember.dto';
import { multerConfig } from '@configs/multer.config';
import { ResponseSend } from '@modules/shared/responseSend';

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
  @ApiBody({ type: CreateMemberDto })
  @HttpCode(HttpStatus.CREATED)
  async createMember(
    @Body() data: CreateMemberDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 }) // 2 MegaBytes
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) data.profileImage = file.path;
    const result = await this.memberService.create(data);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.CREATED,
    );
  }

  @Get()
  // TODO: Comentado para não utilizar Guards
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findManyMembers() {
    const result = await this.memberService.findMany();

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findMemberById(@Param('id') id: string) {
    const result = await this.memberService.findById(id);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', multerConfig('member')),
    MemberRequestTransformInterceptor
  )
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateMemberDto })
  async updateMember(
    @Param('id') id: string,
    @Body() payload: UpdateMemberDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 }) // 2 MegaBytes
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) payload.profileImageUrl = file.path;
    const result = await this.memberService.update(id, payload);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteMember(@Param('id') id: string) {
    const result = await this.memberService.delete(id);

    if (result.isLeft()) return ResponseSend(
      null,
      result.value.message,
      HttpStatus.OK,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
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

    if (result.isLeft()) return ResponseSend(
      result.value,
      null,
      HttpStatus.BAD_REQUEST,
    );

    return ResponseSend(
      result.value,
      null,
      HttpStatus.OK,
    );
  }
}
