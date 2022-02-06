import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validacion de DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      // Descarta informacion extra que no esta en el DTO del body
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuracion para la documentacion
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('Tienda de ejemplo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
