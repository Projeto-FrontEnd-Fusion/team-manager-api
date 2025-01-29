import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Member, MemberSchema } from '../members/schema/Member';
import { Project, ProjectSchema } from './schema/Project';
import { MemberService } from '../members/member.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, MemberService],
})
export class ProjectModule {}
