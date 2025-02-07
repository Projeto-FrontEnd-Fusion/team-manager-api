import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from '@entity/Member';
import { MemberProjectController } from './member_project.controller';
import { MemberProjectService } from './member_project.service';
import { Project } from '@entity/Project';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Project])],
  controllers: [MemberProjectController],
  providers: [MemberProjectService],
  exports: [MemberProjectService],
})
export class MemberProjectModule {}
