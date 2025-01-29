import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "./dto/Project.dto";
import { ProjectService } from "./project.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "src/config/multer.config";

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Patch(":memberId")
  @UseInterceptors(FileInterceptor('file', multerConfig('project')))
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProjectDto
  })
  async addProject(
    @UploadedFile() file: Express.Multer.File,
    @Param('memberId') memberId: string,
    @Body() data: CreateProjectDto
  ) {
    data.projectCover = file.path
    this.projectService.addProject(memberId, data)
  }

  @Delete(":id/member-id/:memberId")
  @HttpCode(204)
  async removeProject(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ) {
    this.projectService.removeProject(id, memberId)
  }
}