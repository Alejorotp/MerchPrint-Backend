// in-memory-company.repository.ts

import { Company } from '../../../domain/companies/company.entity';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';

export class InMemoryCompanyRepository implements CompanyRepositoryPort {
    private companies: Company[] = [];

    async save(company: Company): Promise<Company> {
        this.companies.push(company);
        return company;
    }

    async findById(id: string): Promise<Company | null> {
        return this.companies.find(company => company.id === id) || null;
    }

    async findAll(): Promise<Company[]> {
        return this.companies;
    }

    async delete(id: string): Promise<void> {
        this.companies = this.companies.filter(company => company.id !== id);
    }

    async existsByName(name: string): Promise<boolean> {
        return this.companies.some(company => company.name === name);
    }

    async existsById(id: string): Promise<boolean> {
        return this.companies.some(company => company.id === id);
    }
    async update(id: string, update: Partial<Company>): Promise<Company | null> {
        const index = this.companies.findIndex(company => company.id === id);
        if (index === -1) return null;

        const existingCompany = this.companies[index];
        const updatedCompany = { ...existingCompany, ...update };
        this.companies[index] = updatedCompany;
        return updatedCompany;
    }
}