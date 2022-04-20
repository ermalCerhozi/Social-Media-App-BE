import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(environment.server.prefix);

  setupSwagger(app);

  await app.listen(environment.server.port);
}

bootstrap();
