import { Module } from '@nestjs/common';

import { MemberProjectController } from './member_project.controller';
import { MemberProjectService } from './member_project.service';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MemberProjectController],
  providers: [MemberProjectService],
  exports: [MemberProjectService],
})
export class MemberProjectModule {}
