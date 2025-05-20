import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateManyProjectsDto {
  @ApiProperty({ description: 'Member id' })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Array of many projects to insert member id in each',
  })
  @IsArray()
  projectsIds: string[];
}
