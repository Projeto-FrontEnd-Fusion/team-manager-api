import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ProfessionalProfileDto {
  @ApiProperty({ example: 'linkedin' })
  @IsString()
  platform: string;

  @ApiProperty({ example: 'https://linkedin.com/seunome' })
  @IsString()
  url: string;
}

export class CreateMemberDto {
  @ApiProperty({ description: 'Name of the member', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Technology stack of the member',
    example: 'Fullstack',
  })
  @IsNotEmpty()
  @IsString()
  stack: string;

  @ApiProperty({
    description: 'Community level of the member',
    example: 'Senior',
  })
  @IsString()
  communityLevel: string;

  @ApiProperty({
    description: 'Current squad of the member',
    example: 'Alpha Squad',
  })
  @IsOptional()
  @IsString()
  currentSquad: string;

  @ApiProperty({
    type: [ProfessionalProfileDto],
    description: 'Your professional profile with URL linkedin',
    example: [{ platform: 'linkedin', url: 'https://linkedin.com/seunome' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessionalProfileDto)
  professionalProfiles: ProfessionalProfileDto[];

  @ApiProperty({
    description: 'Recive an array of Technical Hard Skills IDs',
    example: ['1', '2', '3'],
  })
  @IsOptional()
  @IsArray()
  hardSkills: string[];

  @ApiProperty({
    description: 'Soft skills',
    example: 'Communication, Teamwork',
  })
  @IsOptional()
  @IsArray()
  softSkills: string[];

  @ApiProperty({
    description: 'Imagem de perfil',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;

  @ApiProperty({
    type: String,
    required: false,
  })
  // @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  projects: string[];
}
