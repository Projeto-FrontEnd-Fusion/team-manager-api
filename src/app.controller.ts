import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpCode, Redirect } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
@ApiTags('Back-end Fusion')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Summary exemplo',
    description: 'Rota exemplo',
  })
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
