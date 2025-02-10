import { Module } from '@nestjs/common';

// import { DatabaseModule } from '@infra/typeorm/postgres.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
