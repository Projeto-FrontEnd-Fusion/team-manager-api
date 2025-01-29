import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty({ description: 'Name of the member', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Technology stack of the member',
    required: false,
  })
  @IsOptional()
  @IsString()
  stack?: string;

  @ApiProperty({
    description: 'Community level of the member',
    required: false,
  })
  @IsOptional()
  @IsString()
  communityLevel?: string;

  @ApiProperty({ description: 'Current squad of the member', required: false })
  @IsOptional()
  @IsString()
  currentSquad?: string;

  @ApiProperty({
    description: 'Your professional profile with URL linkedin',
    required: false,
  })
  @IsOptional()
  @IsString()
  professionalProfile?: string[];

  @ApiProperty({ description: 'Your professional platform', required: false })
  @IsOptional()
  @IsString()
  platform?: string[];

  @ApiProperty({ description: 'Technical skills', required: false })
  @IsOptional()
  @IsString()
  skills?: string[];

  @ApiProperty({ description: 'Soft skills', required: false })
  @IsOptional()
  @IsString()
  softSkills?: string[];

  @ApiProperty({
    description: 'Imagem de perfil',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file?: any;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  profileImage?: string;
}
