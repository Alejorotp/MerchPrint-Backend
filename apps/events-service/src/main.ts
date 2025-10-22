import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const cfg = new DocumentBuilder()
    .setTitle('Events Service')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, doc);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'events_queue',
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
