import { Controller, Get } from '@nestjs/common';
import { CompaniesServiceService } from './companies-service.service';

@Controller()
export class CompaniesServiceController {
  constructor(private readonly companiesServiceService: CompaniesServiceService) {}

  @Get()
  getHello(): string {
    return this.companiesServiceService.getHello();
  }
}
