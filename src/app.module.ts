import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceConfig } from './database/dataSource';
import { MemberModule } from './modules/members/member.module';

@Module({
  imports: [dataSourceConfig(), MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
