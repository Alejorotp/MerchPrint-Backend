// get-company.usecase.ts

import { Company } from '../../../domain/companies/company.entity';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';

export class GetCompanyUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(id: string): Promise<Company | null> {
        return this.companyRepo.findById(id);
    }
}