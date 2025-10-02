// update-product.usecase.ts

import { Product } from '../../../domain/products/product.entity';
import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';
import { UpdateProductDTO } from '../dto/update-product.dto';

export class UpdateProductUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(id: string, input: UpdateProductDTO) {
        const existingProduct = await this.productRepo.findById(id);
        if (!existingProduct) throw new Error('Product not found');

        const updatedData: Partial<Product> = {
            name: input.name ?? existingProduct.name,
            basePrice: input.basePrice ?? existingProduct.basePrice,
            optionsJson: input.optionsJson ?? existingProduct.optionsJson,
        };
        const updatedProduct = await this.productRepo.update(id, updatedData);
        if (!updatedProduct) throw new Error('Failed to update product');
        return updatedProduct;
    }
}
