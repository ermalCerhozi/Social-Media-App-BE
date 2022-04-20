import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { environment } from './environment/environment';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog internship rest api for Thoma Karakashi')
    .setVersion('1.0.0')
    .build();

  SwaggerModule.setup(
    environment.server.prefix,
    app,
    SwaggerModule.createDocument(app, config),
  );
}
