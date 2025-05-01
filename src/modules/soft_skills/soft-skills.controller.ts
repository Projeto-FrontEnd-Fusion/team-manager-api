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
    const result = await this.softSkillService.create(payload);

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
  async findManySoftSkills() {
    const result = await this.softSkillService.findMany();

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
  async findSoftSkillById(@Param('id') id: string) {
    const result = await this.softSkillService.findById(id);

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
  async deleteSoftSkillById(@Param('id') id: string) {
    const result = await this.softSkillService.delete(id);

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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payload: Partial<CreateSoftSkillDto>,
  ) {
    const result = await this.softSkillService.update(id, payload);

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
