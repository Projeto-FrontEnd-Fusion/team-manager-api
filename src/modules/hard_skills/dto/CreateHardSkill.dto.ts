import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHardSkillDto {
  @ApiProperty({
    description: 'Nome da Skill',
    example: 'Javascript',
    examples: ['Javascript', 'Typescript'],
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
