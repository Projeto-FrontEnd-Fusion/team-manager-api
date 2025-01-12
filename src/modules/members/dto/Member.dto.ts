import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, ArrayNotEmpty } from "class-validator";

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

  @ApiProperty({ description: 'Your professional profile with  url linkedin', example: ['https://redeprofissional/seunome'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  professionalProfile: string[];

  @ApiProperty({ description: 'Your professional platform', example: ['github'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  platform: string[];

  @ApiProperty({ description: 'Technical skills', example: ['JavaScript', 'TypeScript'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({ description: 'Soft skills', example: ['Communication', 'Teamwork'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  softSkills: string[];
}
