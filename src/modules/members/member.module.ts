import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from '@entity/Member';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Project } from '@entity/Project';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Member])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
