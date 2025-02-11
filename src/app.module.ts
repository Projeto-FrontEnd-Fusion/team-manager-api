import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MemberModule } from '@modules/members/member.module';
import { MemberProjectModule } from '@modules/member_project/member_project.module';
import { ProjectModule } from '@modules/project/project.module';

@Module({
  imports: [
    ProjectModule,
    MemberModule,
    MemberProjectModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
      // validationSchema: Joi.object({
      //   NODE_ENV: Joi.string().valid('development', 'production').default('development'),
      // }),
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1 * 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10 * 1000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60 * 1000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
