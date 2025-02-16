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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

import { ProjectService } from './project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './statics/uploads/project',
        filename: (req, file, cb) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  async createProject(
    @Body() data,
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
  @HttpCode(HttpStatus.OK)
  async updateProject(@Param('projectId') projectId: string, @Body() payload) {
    return await this.projectService.updateProject(projectId, payload);
  }
}
