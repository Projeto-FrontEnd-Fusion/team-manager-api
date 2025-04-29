import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSoftSkillDto } from './dto/CreateSoftSkill.dto';
import { SoftSkillService } from './soft-skills.service';

@ApiTags('Soft Skills')
@Controller('soft-skills')
export class SoftSkillController {
  constructor(private readonly softSkillService: SoftSkillService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSoftSkill(@Body() payload: CreateSoftSkillDto) {
    return await this.softSkillService.create(payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManySoftSkills() {
    return await this.softSkillService.findMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSoftSkillById(@Param('id') id: string) {
    return await this.softSkillService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSoftSkillById(@Param('id') id: string) {
    return await this.softSkillService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payload: Partial<CreateSoftSkillDto>,
  ) {
    return await this.softSkillService.update(id, payload);
  }
}
