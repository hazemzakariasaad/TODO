/* eslint-disable prettier/prettier */
import { NestFactory }    from '@nestjs/core';
import { AppModule }      from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('API documentation for Todo app')
    .setVersion('1.0')
    .addTag('todo')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header', 
        name: 'Authorization',

      },
      'jwt', 
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // CORS
  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });

  await app.listen(process.env.PORT ? +process.env.PORT : 3000);
  console.log(`🚀 Listening on http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();