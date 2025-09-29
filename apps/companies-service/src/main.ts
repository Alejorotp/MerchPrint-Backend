import { NestFactory } from '@nestjs/core';
import { CompaniesServiceModule } from './companies-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CompaniesServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const cfg = new DocumentBuilder().setTitle('Companies Service').setVersion('1.0').build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, doc);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();