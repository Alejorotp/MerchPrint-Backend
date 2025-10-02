// products.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductDTO } from '../../../application/products/dto/create-product.dto';
import { UpdateProductDTO } from '../../../application/products/dto/update-product.dto';
import { Product } from '../../../domain/products/product.entity';
import { CreateProductUseCase } from '../../../application/products/usecases/create-product.usecase';
import { GetProductUseCase } from '../../../application/products/usecases/get-product.usecase';
import { UpdateProductUseCase } from '../../../application/products/usecases/update-product.usecase';
import { DeleteProductUseCase } from '../../../application/products/usecases/delete-product.usecase';
import { GetAllProductsUseCase } from '../../../application/products/usecases/get-all-products.usecase';
import { GetProductsByCompanyUseCase } from '../../../application/products/usecases/get-products-by-company.usecase';
import { ExistsProductByIdUseCase } from '../../../application/products/usecases/exists-product.usecase';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly getProduct: GetProductUseCase,
        private readonly updateProduct: UpdateProductUseCase,
        private readonly deleteProduct: DeleteProductUseCase,
        private readonly getAllProducts: GetAllProductsUseCase,
        private readonly getProductsByCompany: GetProductsByCompanyUseCase,
        private readonly existsProductById: ExistsProductByIdUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.', type: Product })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async create(@Body() body: CreateProductDTO): Promise<Product> {
        return this.createProduct.execute(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Return all products.', type: [Product] })
    async findAll(): Promise<Product[]> {
        return this.getAllProducts.execute();
    }

    @Get('company/:companyId')
    @ApiOperation({ summary: 'Get all products by company ID' })
    @ApiResponse({ status: 200, description: 'Return all products for the specified company.', type: [Product] })
    async findByCompany(@Param('companyId') companyId: string): Promise<Product[]> {
        return this.getProductsByCompany.execute(companyId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiResponse({ status: 200, description: 'Return the product.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async findOne(@Param('id') id: string): Promise<Product> {
        const product = await this.getProduct.execute(id);
        if (!product) throw new Error('Product not found');
        return product;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async update(@Param('id') id: string, @Body() body: UpdateProductDTO): Promise<Product> {
        return this.updateProduct.execute(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.deleteProduct.execute(id);
    }

    @Get(':id/exists')
    @ApiOperation({ summary: 'Check if a product exists' })
    @ApiResponse({ status: 200, description: 'Return whether the product exists.' })
    async exists(@Param('id') id: string): Promise<{ exists: boolean }> {
        const exists = await this.existsProductById.execute(id);
        return { exists };
    }
}
