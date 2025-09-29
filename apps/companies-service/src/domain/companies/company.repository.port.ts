// company.repository.port.ts

import { Company } from './company.entity';

export interface CompanyRepositoryPort {
    save(company: Company): Promise<Company>;
    findById(id: string): Promise<Company | null>;
    findAll(): Promise<Company[]>;
    delete(id: string): Promise<void>;
    existsByName(name: string): Promise<boolean>;
    existsById(id: string): Promise<boolean>;
    update(id: string, update: Partial<Company>): Promise<Company | null>;
}