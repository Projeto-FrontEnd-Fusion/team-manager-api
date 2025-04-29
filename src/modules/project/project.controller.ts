import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
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

import { CreateProjectDto } from './dto/CreateProject.dto';
import { ProjectRequestTransformInterceptor } from '@interceptors/index';
import { ProjectResponseTransformInterceptor } from '@interceptors/index';
import { ProjectService } from './project.service';
import { multerConfig } from '@configs/multer.config';

@ApiTags('Projects')
@UseInterceptors(ProjectResponseTransformInterceptor)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig('project')))
  @UseInterceptors(ProjectRequestTransformInterceptor)
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  async createProject(
    @Body() data: CreateProjectDto,
    @UploadedFile(
      new ParseFilePipeBuilder().addMaxSizeValidator({ maxSize: 2048 }).build({
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) data.cover = file.path;
    return await this.projectService.create(data);
  }

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  async findProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.findById(projectId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({})
  async findManyProjects() {
    return await this.projectService.findMany();
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.OK)
  async deleteProjectById(@Param('projetId') projectId: string) {
    return await this.projectService.delete(projectId);
  }

  @Patch(':projectId')
  @UseInterceptors(FileInterceptor('file', multerConfig('project')))
  @HttpCode(HttpStatus.OK)
  async updateProject(@Param('projectId') projectId: string, @Body() payload) {
    return await this.projectService.updateProject(projectId, payload);
  }
}
