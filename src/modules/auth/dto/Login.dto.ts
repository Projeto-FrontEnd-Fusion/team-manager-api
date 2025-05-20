import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email to authenticate',
    example: 'teste_teste@teste.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password to authenticate',
    example: 'MyPassword123@',
    required: true,
  })
  @IsString()
  password: string;
}
