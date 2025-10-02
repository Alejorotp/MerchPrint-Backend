// product.mapper.ts

import { Product } from '../../../domain/products/product.entity';
import { ProductDTO } from '../dto/product.dto';

export const toProductDTO = (product: Product): ProductDTO => ({
    id: product.id ?? '',
    companyId: product.companyId,
    name: product.name,
    basePrice: product.basePrice,
    optionsJson: product.optionsJson,
});
