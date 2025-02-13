import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app
    .listen(process.env.PORT ?? 3001)
    .then(() =>
      console.log(`The Application is up and running listening to port 3001`),
    );
}
bootstrap();
