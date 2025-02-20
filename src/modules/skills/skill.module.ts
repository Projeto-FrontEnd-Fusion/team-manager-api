import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [PrismaModule],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
