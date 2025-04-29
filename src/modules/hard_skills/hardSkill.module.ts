import { Module } from '@nestjs/common';

import { HardSkillService } from './hardSkill.service';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { SkillController } from './hardSkill.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SkillController],
  providers: [HardSkillService],
  exports: [HardSkillService],
})
export class HardSkillModule { }
