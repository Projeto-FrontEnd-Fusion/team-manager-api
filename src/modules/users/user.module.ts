import { Module } from "@nestjs/common";

import { PrismaModule } from "@infra/database/prisma/helpers/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MemberService } from "@modules/members/member.service";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, MemberService],
  exports: [UserService],
})
export class UserModule { }