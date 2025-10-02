// exists-product.usecase.ts

import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';

export class ExistsProductByIdUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(id: string): Promise<boolean> {
        return this.productRepo.existsById(id);
    }
}
