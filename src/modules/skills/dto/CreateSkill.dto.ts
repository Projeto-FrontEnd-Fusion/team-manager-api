import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    description: 'Nome da Skill',
    example: 'Javascript',
    examples: ['Javascript', 'Typescript'],
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
