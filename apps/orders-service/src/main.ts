import { NestFactory } from '@nestjs/core';
import { OrdersServiceModule } from './orders-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrdersServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const cfg = new DocumentBuilder()
    .setTitle('Orders Service')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, doc);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
