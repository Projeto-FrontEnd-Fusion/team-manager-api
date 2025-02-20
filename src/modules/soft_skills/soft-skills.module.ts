import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { Module } from '@nestjs/common';
import { SoftSkillController } from './soft-skills.controller';
import { SoftSkillService } from './soft-skills.service';

@Module({
  imports: [PrismaModule],
  controllers: [SoftSkillController],
  providers: [SoftSkillService],
  exports: [SoftSkillService],
})
export class SoftSkillsModule {}
