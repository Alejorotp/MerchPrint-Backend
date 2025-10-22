import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './controllers/auth.gateway.controller';
import { CompaniesGatewayController } from './controllers/companies.gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'COMPANIES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: 'companies_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [
    ApiGatewayController,
    AuthGatewayController,
    CompaniesGatewayController,
  ],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
