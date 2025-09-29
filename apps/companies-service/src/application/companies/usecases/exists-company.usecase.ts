// exists-company.usecase.ts

import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';

export class ExistsCompanyByNameUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(name: string): Promise<boolean> {
        return this.companyRepo.existsByName(name);
    }
}

export class ExistsCompanyByIdUseCase {
    constructor(private readonly companyRepo: CompanyRepositoryPort) {}

    async execute(id: string): Promise<boolean> {
        return this.companyRepo.existsById(id);
    }
}