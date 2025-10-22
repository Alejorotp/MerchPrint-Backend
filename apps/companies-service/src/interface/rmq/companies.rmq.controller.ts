import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetCompanyUseCase } from '../../application/companies/usecases/get-company.usecase';

@Controller()
export class CompaniesRmqController {
  constructor(private readonly getCompany: GetCompanyUseCase) {}

  @MessagePattern('companies.getById')
  async getById(@Payload() id: string) {
    return this.getCompany.execute(id);
  }
}
