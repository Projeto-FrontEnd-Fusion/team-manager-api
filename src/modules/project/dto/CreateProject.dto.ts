import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name',
    maxLength: 250,
    example: 'Project Fusion',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Url from the image cover of the project',
    maxLength: 250,
    example: 'https://avatars.githubusercontent.com/u/161888104?s=200&v=4',
  })
  @IsOptional()
  @IsString()
  cover?: string;

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
    examples: ['Java', 'JavaScript', 'Python'],
    default: ["Typescript", "Javascript", "Python"]
  })
  @IsArray()
  technologies?: string[];

  @ApiProperty({
    description: 'URL of the project',
    example: 'https://github.com/your-username/project-repo',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Imagem do projeto',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;
}
