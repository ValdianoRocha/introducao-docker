import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const porta = process.env.PORT ?? 3000


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove campos não esperados
      forbidNonWhitelisted: true, // lança erro se enviar campos a mais
      transform: true,       // transforma payloads nos tipos corretos
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Minha API')
    .setDescription('Documentação da API em que estamos estudando Docker e NestJS.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(porta);
  Logger.log(`http://localhost:${porta}`)
}
bootstrap();
