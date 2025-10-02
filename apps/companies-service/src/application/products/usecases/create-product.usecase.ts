// create-product.usecase.ts

import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';
import { CompanyRepositoryPort } from '../../../domain/companies/company.repository.port';
import { CreateProductDTO } from '../dto/create-product.dto';
import { Product } from '../../../domain/products/product.entity';
import { toProductDTO } from '../mappers/product.mapper';
import { ProductDTO } from '../dto/product.dto';

export class CreateProductUseCase {
    constructor(
        private readonly productRepo: ProductRepositoryPort,
        private readonly companyRepo: CompanyRepositoryPort,
    ) {}

    async execute(input: CreateProductDTO): Promise<ProductDTO> {
        // Check if company exists
        const companyExists = await this.companyRepo.existsById(input.companyId);
        if (!companyExists) {
            throw new Error('Company not found');
        }

        const product = new Product(input.companyId, input.name, input.basePrice, input.optionsJson);
        const savedProduct = await this.productRepo.save(product);
        return toProductDTO(savedProduct);
    }
}
