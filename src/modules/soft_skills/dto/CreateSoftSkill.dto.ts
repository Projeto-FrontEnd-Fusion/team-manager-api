import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoftSkillDto {
  @ApiProperty({
    description: 'Nome da Soft Skill',
    examples: ['Liderança', 'Comunicativo'],
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
