import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    maxLength: 250,
    example: 'Project Fusion',
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsOptional()
  @IsString()
  projectCover: string;

  @ApiProperty({
    description: 'Description of your project',
    maxLength: 250,
    example: 'A project designed to help manage personal finances effectively.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Technologies used in the project',
    maxLength: 250,
    example: ['Java, JavaScript, Python'],
  })
  @IsArray()
  @IsNotEmpty()
  technologies: string[];

  @ApiProperty({
    description: 'URL of the project',
    example: 'https://github.com/your-username/project-repo',
  })
  @IsNotEmpty()
  @IsUrl()
  projectUrl: string;

  @ApiProperty({
    description: 'Members of the project',
    example: ['423242', '23124'],
  })
  @IsArray()
  members: string[];

  @ApiProperty({
    description: 'Imagem do projeto',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;
}
