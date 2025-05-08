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
import { ApiTags } from '@nestjs/swagger';

import { CreateSoftSkillDto } from './dto/CreateSoftSkill.dto';
import { SoftSkillService } from './soft-skills.service';
import { ResponseSend } from '@modules/shared/responseSend';

@ApiTags('Soft Skills')
@Controller('soft-skills')
export class SoftSkillController {
  constructor(private readonly softSkillService: SoftSkillService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSoftSkill(@Body() payload: CreateSoftSkillDto) {
    const result = await this.softSkillService.create(payload);

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
  async findManySoftSkills() {
    const result = await this.softSkillService.findMany();

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
  async findSoftSkillById(@Param('id') id: string) {
    const result = await this.softSkillService.findById(id);

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
  async deleteSoftSkillById(@Param('id') id: string) {
    const result = await this.softSkillService.delete(id);

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
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payload: Partial<CreateSoftSkillDto>,
  ) {
    const result = await this.softSkillService.update(id, payload);

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
