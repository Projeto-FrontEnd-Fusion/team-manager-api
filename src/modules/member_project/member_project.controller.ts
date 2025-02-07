import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MemberProjectService } from './member_project.service';

@ApiTags('Member to Project')
@Controller('member_project')
export class MemberProjectController {
  constructor(private readonly memberProjectService: MemberProjectService) {}

  @Delete(':memberId/:projectId')
  @HttpCode(HttpStatus.OK)
  async deleteMemberFromProject(
    @Param('memberId') memberId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.memberProjectService.deleteMemberFromProject(memberId, projectId);
  }
}
