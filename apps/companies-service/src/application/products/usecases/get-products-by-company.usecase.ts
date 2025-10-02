// get-products-by-company.usecase.ts

import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';
import { ProductDTO } from '../dto/product.dto';
import { toProductDTO } from '../mappers/product.mapper';

export class GetProductsByCompanyUseCase {
    constructor(private readonly productRepo: ProductRepositoryPort) {}

    async execute(companyId: string): Promise<ProductDTO[]> {
        const products = await this.productRepo.findByCompanyId(companyId);
        return products.map(toProductDTO);
    }
}
