// in-memory-product.repository.ts

import { Product } from '../../../domain/products/product.entity';
import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';

export class InMemoryProductRepository implements ProductRepositoryPort {
    private products: Product[] = [];
    private idCounter = 1;

    async save(product: Product): Promise<Product> {
        const id = product.id || (this.idCounter++).toString();
        const productWithId = new Product(
            product.companyId,
            product.name,
            product.basePrice,
            product.optionsJson,
            id,
        );
        this.products.push(productWithId);
        return productWithId;
    }

    async findById(id: string): Promise<Product | null> {
        return this.products.find(product => product.id === id) || null;
    }

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async findByCompanyId(companyId: string): Promise<Product[]> {
        return this.products.filter(product => product.companyId === companyId);
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(product => product.id !== id);
    }

    async existsById(id: string): Promise<boolean> {
        return this.products.some(product => product.id === id);
    }

    async update(id: string, update: Partial<Product>): Promise<Product | null> {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) return null;

        const existingProduct = this.products[index];
        const updatedProduct = new Product(
            update.companyId ?? existingProduct.companyId,
            update.name ?? existingProduct.name,
            update.basePrice ?? existingProduct.basePrice,
            update.optionsJson ?? existingProduct.optionsJson,
            existingProduct.id
        );
        this.products[index] = updatedProduct;
        return updatedProduct;
    }
}
