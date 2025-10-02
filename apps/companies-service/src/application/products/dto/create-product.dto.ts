// create-product.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'company-123', description: 'The ID of the company that owns the product' })
    companyId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'T-Shirt', description: 'The name of the product' })
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 19.99, description: 'The base price of the product' })
    basePrice: number;

    @ApiProperty({ 
        example: { colors: ['red', 'blue', 'green'], sizes: ['S', 'M', 'L', 'XL'] }, 
        description: 'Product options in JSON format' 
    })
    optionsJson: any;
}
