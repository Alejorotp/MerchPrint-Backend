import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCompanyUseCase } from '../../application/companies/usecases/create-company.usecase';
import { GetAllCompaniesUseCase } from '../../application/companies/usecases/get-all-companies.usecase';
import { GetCompanyUseCase } from '../../application/companies/usecases/get-company.usecase';
import { UpdateCompanyUseCase } from '../../application/companies/usecases/update-company.usecase';
import { DeleteCompanyUseCase } from '../../application/companies/usecases/delete-company.usecase';
import { CreateCompanyDTO } from '../../application/companies/dto/create-company.dto';
import { UpdateCompanyDTO } from '../../application/companies/dto/update-company.dto';
import { toCompanyDTO } from '../../application/companies/mappers/company.mapper';

@Controller()
export class CompaniesRmqController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly getAllCompanies: GetAllCompaniesUseCase,
    private readonly getCompany: GetCompanyUseCase,
    private readonly updateCompany: UpdateCompanyUseCase,
    private readonly deleteCompany: DeleteCompanyUseCase,
  ) {}

  @MessagePattern('companies.create')
  async create(@Payload() data: CreateCompanyDTO) {
    const company = await this.createCompany.execute(data);
    return toCompanyDTO(company);
  }

  @MessagePattern('companies.getAll')
  async getAll() {
    const companies = await this.getAllCompanies.execute();
    return companies.map(toCompanyDTO);
  }

  @MessagePattern('companies.getById')
  async getById(@Payload() id: string) {
    const company = await this.getCompany.execute(id);
    if (!company) return null;
    return toCompanyDTO(company);
  }

  @MessagePattern('companies.update')
  async update(@Payload() data: { id: string; body: UpdateCompanyDTO }) {
    const company = await this.updateCompany.execute(data.id, data.body);
    if (!company) return null;
    return toCompanyDTO(company);
  }

  @MessagePattern('companies.delete')
  async delete(@Payload() id: string) {
    await this.deleteCompany.execute(id);
    return { message: 'Company deleted successfully' };
  }
}
