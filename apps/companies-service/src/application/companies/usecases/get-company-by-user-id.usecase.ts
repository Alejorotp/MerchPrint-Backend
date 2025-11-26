// get-company-by-user-id.usecase.ts

import { Company } from '../../../domain/companies/company.entity';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';

export class GetCompanyByUserIdUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) { }

    async execute(userId: string): Promise<Company | null> {
        return this.companyRepo.findByUserId(userId);
    }
}
