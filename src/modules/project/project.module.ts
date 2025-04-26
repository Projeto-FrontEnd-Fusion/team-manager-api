import { Module } from '@nestjs/common';

import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
