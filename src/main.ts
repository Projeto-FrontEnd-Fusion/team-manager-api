import 'reflect-metadata';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { appConfig } from './configs/app.config';
import { corsOptions } from './configs/cors';
import { useSwagger } from './configs/useSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
    logger: ['error', 'warn', 'log'],
  });

  appConfig(app);

  app.use(
    '/statics/uploads',
    express.static(join(__dirname, '..', 'statics', 'uploads')),
  );

  useSwagger(app);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT');
  await app.listen(PORT);
  console.log(`APP STARTED ON PORT: ${PORT}`);
}
bootstrap();
