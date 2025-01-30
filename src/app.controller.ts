import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('Hello world')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'acesse /api para verificar a documentação';
  }
}
