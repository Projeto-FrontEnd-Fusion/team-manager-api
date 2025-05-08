import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'jhondoe@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '********' })
  @IsString()
  password: string;
}
