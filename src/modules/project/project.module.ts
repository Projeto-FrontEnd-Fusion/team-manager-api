import { Module } from '@nestjs/common';

import { MemberService } from '../members/member.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from 'src/entity/Member';
import { Project } from 'src/entity/Project';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Member])],
  controllers: [ProjectController],
  providers: [ProjectService, MemberService],
  exports: [ProjectService],
})
export class ProjectModule {}
