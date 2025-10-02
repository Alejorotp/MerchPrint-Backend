// update-product.dto.ts

import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Updated T-Shirt', description: 'The updated name of the product', required: false })
    name?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @ApiProperty({ example: 24.99, description: 'The updated base price of the product', required: false })
    basePrice?: number;

    @IsOptional()
    @ApiProperty({ 
        example: { colors: ['red', 'blue', 'green'], sizes: ['S', 'M', 'L', 'XL'] }, 
        description: 'Updated product options in JSON format',
        required: false 
    })
    optionsJson?: any;
}
