import { INestApplication, ValidationPipe } from '@nestjs/common';

export function appConfig(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
}
