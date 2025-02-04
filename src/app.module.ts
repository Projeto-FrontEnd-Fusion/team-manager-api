import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './modules/members/member.module';
import { PostgresConfigService } from '@infra/typeorm/postgres.config.service';
import { ProjectModule } from './modules/project/project.module';
import { dataSourceConfig } from './infra/database/mongoose';

@Module({
  imports: [
    dataSourceConfig(),
    MemberModule,
    ProjectModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
