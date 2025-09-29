// update-company.usecase.ts

import { Company } from '../../../domain/companies/company.entity';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';
import { UpdateCompanyDTO } from '../dto/update-company.dto';

export class UpdateCompanyUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(id: string, input: UpdateCompanyDTO) {
        const existingCompany = await this.companyRepo.findById(id);
        if (!existingCompany) throw new Error('Company not found');

        const updatedData: Partial<Company> = {
            name: input.name ?? existingCompany.name,
            contactEmail: input.contactEmail ?? existingCompany.contactEmail,
        };
        const updatedCompany = await this.companyRepo.update(id, updatedData);
        if (!updatedCompany) throw new Error('Failed to update company');
        return updatedCompany;
    }
}