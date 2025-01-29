import { Module } from "@nestjs/common";
import { Project, ProjectSchema } from "./schema/Project";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { MemberService } from "../members/member.service";
import { Member, MemberSchema } from "../members/schema/Member";

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

export class ProjectModule { }