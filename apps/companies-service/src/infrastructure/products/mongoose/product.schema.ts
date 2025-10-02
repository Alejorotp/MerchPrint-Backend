// product.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    companyId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    basePrice: number;

    @Prop({ type: Object, default: {} })
    optionsJson: any;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
