import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, IsOptional } from "class-validator";

export class UpdateMemberDto {
  @ApiProperty({ description: 'Name of the member', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Technology stack of the member', example: 'Fullstack', required: false })
  @IsOptional()
  @IsString()
  stack: string;

  @ApiProperty({ description: 'Community level of the member', example: 'Senior', required: false })
  @IsOptional()
  @IsString()
  communityLevel: string;

  @ApiProperty({ description: 'Current squad of the member', example: 'Alpha Squad', required: false })
  @IsOptional()
  @IsString()
  currentSquad: string;

  @ApiProperty({ description: 'Technical skills', example: ['JavaScript', 'TypeScript'], required: false })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({ description: 'Soft skills', example: ['Communication', 'Teamwork'], required: false })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  softSkills: string[];
}
