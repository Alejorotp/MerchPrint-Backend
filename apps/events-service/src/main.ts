import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
