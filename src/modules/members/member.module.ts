import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Member, MemberSchema } from './schema/Member';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
