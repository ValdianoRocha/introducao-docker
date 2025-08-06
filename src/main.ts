import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = process.env.PORT ?? 3000
  await app.listen(porta);
  Logger.log(`http://localhost:${porta}`)
}
bootstrap();
