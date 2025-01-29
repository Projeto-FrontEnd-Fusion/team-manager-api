import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ArrayNotEmpty, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class MemberDto {

  @ApiProperty({ description: 'Name of the member', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Technology stack of the member', example: 'Fullstack' })
  @IsNotEmpty()
  @IsString()
  stack: string;

  @ApiProperty({ description: 'Community level of the member', example: 'Senior' })
  @IsNotEmpty()
  @IsString()
  communityLevel: string;

  @ApiProperty({ description: 'Current squad of the member', example: 'Alpha Squad' })
  @IsNotEmpty()
  @IsString()
  currentSquad: string;

  @ApiProperty({ description: 'Your professional profile with URL linkedin', example: 'https://redeprofissional/seunome, https://redeprofissional/seunome' })
  @IsNotEmpty()
  @IsString()
  professionalProfile: string;

  @ApiProperty({ description: 'Your professional platform', example: 'github, linkedin' })
  @IsNotEmpty()
  @IsString()
  platform: string;

  @ApiProperty({ description: 'Technical skills', example: 'JavaScript, TypeScript, Java' })
  @IsNotEmpty()
  @IsString()
  skills: string;

  @ApiProperty({ description: 'Soft skills', example: 'Communication, Teamwork' })
  @IsNotEmpty()
  @IsString()
  softSkills: string;

  @ApiProperty({
    description: 'Imagem de perfil',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
