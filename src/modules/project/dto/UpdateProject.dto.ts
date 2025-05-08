import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsArray } from "class-validator";

import { CreateProjectDto } from "./CreateProject.dto";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: 'Array of members',
    example: ['1'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  members: string[]
}
