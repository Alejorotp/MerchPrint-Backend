import { Controller, Get, Param } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('companies')
export class CompaniesGatewayController {
  constructor(
    @Inject('COMPANIES_SERVICE')
    private readonly companiesClient: ClientProxy,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return firstValueFrom(this.companiesClient.send('companies.getById', id));
  }
}
