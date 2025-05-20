import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
@ApiTags('Back-end Fusion')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Summary exemplo',
    description: 'Rota exemplo',
  })
  @ApiResponse({
    example: 'Hello World!',
    type: String,
    description: "Return the iconic phrase: 'Hello World!'"
  })
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
