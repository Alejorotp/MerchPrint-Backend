import { NestFactory } from '@nestjs/core';
import { CompaniesServiceModule } from './companies-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CompaniesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
