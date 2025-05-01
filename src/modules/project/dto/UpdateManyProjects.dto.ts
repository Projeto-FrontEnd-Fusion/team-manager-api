import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
