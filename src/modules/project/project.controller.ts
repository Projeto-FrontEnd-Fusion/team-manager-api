import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateProjectDto } from './dto/CreateProject.dto';
import { ProjectService } from './project.service';
import { multerConfig } from '@configs/multer.config';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file', multerConfig('project')))
  // @HttpCode(HttpStatus.CREATED)
  // @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProjectDto,
  })
  async createProject(
    // @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateProjectDto,
  ) {
    // if (file.path) data.cover = file.path;
    return await this.projectService.create(data);
  }

  @Get(':projectId')
  @HttpCode(HttpStatus.OK)
  async findProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.findById(projectId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManyProjects() {
    return await this.projectService.findMany();
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.OK)
  async deleteProjectById(@Param('projetId') projectId: string) {
    return await this.projectService.deleteById(projectId);
  }
}
