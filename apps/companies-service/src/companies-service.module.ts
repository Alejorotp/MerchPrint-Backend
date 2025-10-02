import { Module } from '@nestjs/common';
import { CompaniesServiceController } from './companies-service.controller';
import { CompaniesServiceService } from './companies-service.service';
import { CompaniesHttpModule } from './interface/http/companies/companies.module';
import { ProductsModule } from './interface/http/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI!),
    CompaniesHttpModule,
    ProductsModule,
  ],
  controllers: [CompaniesServiceController],
  providers: [CompaniesServiceService],
})
export class CompaniesServiceModule {}

