// get-all-products.usecase.ts

import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';
import { ProductDTO } from '../dto/product.dto';
import { toProductDTO } from '../mappers/product.mapper';

export class GetAllProductsUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(): Promise<ProductDTO[]> {
        const products = await this.productRepo.findAll();
        return products.map(toProductDTO);
    }
}
