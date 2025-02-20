import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/CreateSkill.dto';

@ApiTags('Skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @ApiBody({
    type: CreateSkillDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async createSkill(@Body() payload: CreateSkillDto) {
    return await this.skillService.create(payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSkillById(id: string) {
    return await this.skillService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManySkills() {
    return await this.skillService.findMany();
  }

  @Delete('id')
  @HttpCode(HttpStatus.OK)
  async deleteSkill(@Param('id') id: string) {
    return await this.skillService.delete(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSkill(@Param('id') id: string, @Body() payload: Partial<CreateSkillDto>) {
    return await this.skillService.update(id, payload);
  }
}
