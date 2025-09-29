// get-all-companies.usecase.ts

import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';
import { CompanyDTO } from '../dto/company.dto';
import { toCompanyDTO } from '../mappers/company.mapper';

export class GetAllCompaniesUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(): Promise<CompanyDTO[]> {
        const companies = await this.companyRepo.findAll();
        return companies.map(toCompanyDTO);
    }
}