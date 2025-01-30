import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function useSwagger(app: INestApplication): void {
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
}

export { useSwagger };
