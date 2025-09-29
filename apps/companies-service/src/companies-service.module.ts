import { Module } from '@nestjs/common';
import { CompaniesServiceController } from './companies-service.controller';
import { CompaniesServiceService } from './companies-service.service';
import { CompaniesHttpModule } from './interface/http/companies/companies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI!),
    CompaniesHttpModule,
  ],
  controllers: [CompaniesServiceController],
  providers: [CompaniesServiceService],
})
export class CompaniesServiceModule {}

