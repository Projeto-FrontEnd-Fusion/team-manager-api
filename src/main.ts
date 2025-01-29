import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfig } from './config';
import { corsOptions } from './config/cors';
import { appConfig } from './config/app.config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  appConfig(app)

  app.use('/statics/uploads', express.static(join(__dirname, '..', 'statics', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('Back-end fusion')
    .setDescription('Fusion do projeto colaborativo do fusion.')
    .setVersion('1.0')
    .addTag('fusion')
    .addTag('member')
    .addTag('projects')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(EnvConfig.PORT);
  console.log(`APP STARTED ON PORT: ${EnvConfig.PORT}`)
}
bootstrap();
