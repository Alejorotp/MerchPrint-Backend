// products.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../../infrastructure/products/mongoose/product.schema';
import { Company, CompanySchema } from '../../../infrastructure/companies/mongoose/company.schema';
import { ProductsController } from './products.controller';
import { CreateProductUseCase } from '../../../application/products/usecases/create-product.usecase';
import { GetProductUseCase } from '../../../application/products/usecases/get-product.usecase';
import { UpdateProductUseCase } from '../../../application/products/usecases/update-product.usecase';
import { DeleteProductUseCase } from '../../../application/products/usecases/delete-product.usecase';
import { GetAllProductsUseCase } from '../../../application/products/usecases/get-all-products.usecase';
import { GetProductsByCompanyUseCase } from '../../../application/products/usecases/get-products-by-company.usecase';
import { ExistsProductByIdUseCase } from '../../../application/products/usecases/exists-product.usecase';
import { PRODUCT_REPOSITORY, COMPANY_REPOSITORY } from '../../../application/tokens';
import { MongooseProductRepository } from '../../../infrastructure/products/mongoose/mongoose-product.repository';
import { MongooseCompanyRepository } from '../../../infrastructure/companies/mongoose/mongoose-company.repository';
import { InMemoryProductRepository } from '../../../infrastructure/products/in-memory/in-memory-product.repository';
import { InMemoryCompanyRepository } from '../../../infrastructure/companies/in-memory/in-memory-company.repository';

const useMongoose = !!process.env.DB_URI;

@Module({
    imports: [
        ...(useMongoose ? [
            MongooseModule.forFeature([
                { name: Product.name, schema: ProductSchema },
                { name: Company.name, schema: CompanySchema }
            ])
        ] : []),
    ],
    controllers: [ProductsController],
    providers: [
        {
            provide: PRODUCT_REPOSITORY,
            useClass: useMongoose ? MongooseProductRepository : InMemoryProductRepository,
        },
        {
            provide: COMPANY_REPOSITORY,
            useClass: useMongoose ? MongooseCompanyRepository : InMemoryCompanyRepository,
        },
        { 
            provide: CreateProductUseCase, 
            useFactory: (productRepo: any, companyRepo: any) => new CreateProductUseCase(productRepo, companyRepo), 
            inject: [PRODUCT_REPOSITORY, COMPANY_REPOSITORY] 
        },
        { provide: GetProductUseCase, useFactory: (repo: any) => new GetProductUseCase(repo), inject: [PRODUCT_REPOSITORY] },
        { provide: UpdateProductUseCase, useFactory: (repo: any) => new UpdateProductUseCase(repo), inject: [PRODUCT_REPOSITORY] },
        { provide: DeleteProductUseCase, useFactory: (repo: any) => new DeleteProductUseCase(repo), inject: [PRODUCT_REPOSITORY] },
        { provide: GetAllProductsUseCase, useFactory: (repo: any) => new GetAllProductsUseCase(repo), inject: [PRODUCT_REPOSITORY] },
        { provide: GetProductsByCompanyUseCase, useFactory: (repo: any) => new GetProductsByCompanyUseCase(repo), inject: [PRODUCT_REPOSITORY] },
        { provide: ExistsProductByIdUseCase, useFactory: (repo: any) => new ExistsProductByIdUseCase(repo), inject: [PRODUCT_REPOSITORY] },
    ],
})
export class ProductsModule {}
