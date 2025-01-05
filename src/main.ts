import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfig } from './config';
import { corsOptions } from './config/cors';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  appConfig(app)

  const config = new DocumentBuilder()
    .setTitle('Back-end fusion')
    .setDescription('Fusion do projeto colaborativo do fusion.')
    .setVersion('1.0')
    .addTag('fusion')
    .addTag('member')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(EnvConfig.PORT);
  console.log(`APP STARTED ON PORT: ${EnvConfig.PORT}`)
}
bootstrap();
