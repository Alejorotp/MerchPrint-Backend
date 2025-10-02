// delete-product.usecase.ts

import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';

export class DeleteProductUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(id: string): Promise<void> {
        const existingProduct = await this.productRepo.findById(id);
        if (!existingProduct) throw new Error('Product not found');

        await this.productRepo.delete(id);
    }
}
