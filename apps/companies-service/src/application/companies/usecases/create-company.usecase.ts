// create-company.usecase.ts

import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';
import { CreateCompanyDTO } from '../dto/create-company.dto';
import { Company } from 'apps/companies-service/src/domain/companies/company.entity';
import { toCompanyDTO } from '../mappers/company.mapper';
import { CompanyDTO } from '../dto/company.dto';

export class CreateCompanyUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(input: CreateCompanyDTO): Promise<CompanyDTO> {
        const company = new Company(input.userId, input.name, input.contactEmail);
        const savedCompany = await this.companyRepo.save(company);
        return toCompanyDTO(savedCompany);
    }
}