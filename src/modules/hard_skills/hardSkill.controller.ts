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

@ApiTags('Hard Skill')
@Controller('hard-skills')
export class SkillController {
  constructor(private readonly hardSkillService: HardSkillService) { }

  @Post()
  @ApiBody({
    type: CreateHardSkillDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createHardSkill(@Body() payload: CreateHardSkillDto) {
    return await this.hardSkillService.create(payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSkillById(@Param('id') id: string) {
    return await this.hardSkillService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManySkills() {
    return await this.hardSkillService.findMany();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSkill(@Param('id') id: string) {
    return await this.hardSkillService.delete(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSkill(
    @Param('id') id: string,
    @Body() payload: Partial<CreateHardSkillDto>,
  ) {
    return await this.hardSkillService.update(id, payload);
  }
}
