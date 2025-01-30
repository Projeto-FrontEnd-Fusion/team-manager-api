import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import { EnvConfig } from './configs';
import { appConfig } from './configs/app.config';
import { corsOptions } from './configs/cors';
import { useSwagger } from './configs/useSwagger';

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
