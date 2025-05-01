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
    const result = await this.hardSkillService.create(payload);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSkillById(@Param('id') id: string) {
    const result = await this.hardSkillService.findById(id);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findManySkills() {
    const result = await this.hardSkillService.findMany();

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteSkill(@Param('id') id: string) {
    const result = await this.hardSkillService.delete(id);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateSkill(
    @Param('id') id: string,
    @Body() payload: Partial<CreateHardSkillDto>,
  ) {
    const result = await this.hardSkillService.update(id, payload);

    if (result.isLeft()) return {
      data: null,
      message: result.value.message,
      statusCode: HttpStatus.BAD_REQUEST
    }

    return {
      data: result.value,
      message: null,
      statusCode: HttpStatus.OK
    }
  }
}
