import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  ProjectRequestTransformInterceptor,
  ProjectResponseTransformInterceptor
} from 'src/interceptors';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { ProjectService } from './project.service';
import { multerConfig } from '@configs/multer.config';
import { ResponseSend } from '@modules/shared/responseSend';

@ApiTags('Projects')
@UseInterceptors(ProjectResponseTransformInterceptor)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', multerConfig('project')),
    ProjectRequestTransformInterceptor
  )
  @ApiBody({ type: CreateProjectDto })
  @HttpCode(HttpStatus.CREATED)
  async createProject(
    @Body() data: CreateProjectDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 }) // bytes
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) data.cover = file.path;
    const result = await this.projectService.create(data);

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

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  async findProjectById(@Param('projectId') projectId: string) {
    const result = await this.projectService.findById(projectId);

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

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManyProjects() {
    const result = await this.projectService.findMany();

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

  @Patch(':projectId')
  @UseInterceptors(
    FileInterceptor('file', multerConfig('project')),
    ProjectRequestTransformInterceptor
  )
  @HttpCode(HttpStatus.OK)
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() payload,
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
    if (file) payload.cover = file.path;
    const result = await this.projectService.updateProject(projectId, payload);

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

  @Delete(':projectId')
  @HttpCode(HttpStatus.OK)
  async deleteProjectById(@Param('projectId') projectId: string) {
    const result = await this.projectService.delete(projectId);

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
}
