import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProfessionalProfileDto {
  @ApiProperty({
    description: 'You professional profile platform name',
    example: ['LinkedIn', 'Vercel', 'Instagram', 'Dribbble', 'Behance'],
  })
  @IsString()
  platform: string;

  @ApiProperty({
    description: 'Your profissional profile url',
    example: 'https://linkedin.com/your-name',
  })
  @IsString()
  url: string;
}

export class CreateMemberDto {
  @ApiProperty({
    description: 'Member Name',
    example: 'Jhon Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User Id',
    example: '12345678',
  })
  @IsString()
  userId: string;

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
  professionalProfiles: ProfessionalProfileDto[];

  @ApiProperty({
    description: 'Recive an array of Technical Hard Skills IDs',
    example: ['1', '2', '3'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  hardSkills: string[];

  @ApiProperty({
    description: 'Soft skills',
    example: 'Communication, Teamwork',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  softSkills: string[];

  @ApiProperty({
    description: 'Member Personal Image',
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

  @ApiProperty({
    title: 'Project Ids',
    description: 'Array of Project Ids',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  projects: string[];
}
