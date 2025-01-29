import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceConfig } from './database/dataSource';
import { MemberModule } from './modules/members/member.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [dataSourceConfig(), MemberModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
