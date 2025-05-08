import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSoftSkillDto {
  @ApiProperty({
    description: 'Nome da Soft Skill',
    examples: ['Liderança', 'Comunicativo'],
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
