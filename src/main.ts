import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';
import { EnvConfig } from './config';
import { corsOptions } from './config/cors';
import { appConfig } from './config/app.config';
import { useSwagger } from './config/useSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  appConfig(app);

  app.use(
    '/statics/uploads',
    express.static(join(__dirname, '..', 'statics', 'uploads')),
  );

  useSwagger(app);

  await app.listen(EnvConfig.PORT);
  console.log(`APP STARTED ON PORT: ${EnvConfig.PORT}`);
}
bootstrap();
