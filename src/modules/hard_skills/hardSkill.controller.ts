import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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

import { CreateHardSkillDto } from './dto/CreateHardSkill.dto';
import { HardSkillService } from './hardSkill.service';

@ApiTags('Skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: HardSkillService) {}

  @Post()
  @ApiBody({
    type: CreateHardSkillDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createHardSkill(@Body() payload: CreateHardSkillDto) {
    return await this.skillService.create(payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSkillById(@Param('id') id: string) {
    return await this.skillService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManySkills() {
    return await this.skillService.findMany();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSkill(@Param('id') id: string) {
    return await this.skillService.delete(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSkill(
    @Param('id') id: string,
    @Body() payload: Partial<CreateHardSkillDto>,
  ) {
    return await this.skillService.update(id, payload);
  }
}
