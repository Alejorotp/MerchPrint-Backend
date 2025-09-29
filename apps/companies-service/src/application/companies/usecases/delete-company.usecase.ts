// delete-company.usecase.ts

import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';

export class DeleteCompanyUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(id: string): Promise<void> {
        const existingCompany = await this.companyRepo.findById(id);
        if (!existingCompany) throw new Error('Company not found');

        await this.companyRepo.delete(id);
    }
}