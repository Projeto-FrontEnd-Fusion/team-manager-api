import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'acesse /api para verificar a documentação';
  }
}
