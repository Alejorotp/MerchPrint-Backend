// mongoose-product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRepositoryPort } from '../../../domain/products/product.repository.port';
import { Product } from '../../../domain/products/product.entity';
import { ProductDocument, Product as ProductSchema } from './product.schema';

@Injectable()
export class MongooseProductRepository implements ProductRepositoryPort {
    constructor(
        @InjectModel(ProductSchema.name)
        private readonly productModel: Model<ProductDocument>,
    ) {}

    async save(product: Product): Promise<Product> {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findByCompanyId(companyId: string): Promise<Product[]> {
        return this.productModel.find({ companyId }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }

    async existsById(id: string): Promise<boolean> {
        const count = await this.productModel.countDocuments({ _id: id }).exec();
        return count > 0;
    }

    async update(id: string, update: Partial<Product>): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }
}
