// product.repository.port.ts

import { Product } from './product.entity';

export interface ProductRepositoryPort {
    save(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByCompanyId(companyId: string): Promise<Product[]>;
    delete(id: string): Promise<void>;
    existsById(id: string): Promise<boolean>;
    update(id: string, update: Partial<Product>): Promise<Product | null>;
}
