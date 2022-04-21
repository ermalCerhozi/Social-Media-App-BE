import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';
import { environment } from './environment/environment';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(environment.server.prefix);
  app.useGlobalPipes(new ValidationPipe())

  setupSwagger(app);

  await app.listen(environment.server.port);
}

bootstrap();
