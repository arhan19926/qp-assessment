import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(process.env.PORT ?? 3001)
    .then(() =>
      console.log(`The Application is up and running listening to port 3001`),
    );
}
bootstrap();
