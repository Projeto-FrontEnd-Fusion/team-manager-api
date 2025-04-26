import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MemberModule } from '@modules/members/member.module';
import { ProjectModule } from '@modules/project/project.module';
import { SkillModule } from '@modules/hard_skills/hardSkill.module';
import { SoftSkillsModule } from '@modules/soft_skills/soft-skills.module';

@Module({
  imports: [
    ProjectModule,
    MemberModule,
    SkillModule,
    SoftSkillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
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
