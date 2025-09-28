import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = new DocumentBuilder().setTitle('Auth Service').setVersion('1.0').build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('/docs', app, doc);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
