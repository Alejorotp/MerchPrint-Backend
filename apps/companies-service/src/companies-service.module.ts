import { Module } from '@nestjs/common';
import { CompaniesServiceController } from './companies-service.controller';
import { CompaniesServiceService } from './companies-service.service';

@Module({
  imports: [],
  controllers: [CompaniesServiceController],
  providers: [CompaniesServiceService],
})
export class CompaniesServiceModule {}
