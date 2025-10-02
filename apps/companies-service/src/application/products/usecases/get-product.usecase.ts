// get-product.usecase.ts

import { Product } from '../../../domain/products/product.entity';
import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';

export class GetProductUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(id: string): Promise<Product | null> {
        return this.productRepo.findById(id);
    }
}
