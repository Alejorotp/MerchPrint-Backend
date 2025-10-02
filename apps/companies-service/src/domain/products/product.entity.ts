// product.entity.ts

import { ApiProperty } from '@nestjs/swagger';

export class Product {
    @ApiProperty()
    public readonly id?: string;

    @ApiProperty()
    public readonly companyId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public basePrice: number;

    @ApiProperty()
    public optionsJson: any;

    constructor(companyId: string, name: string, basePrice: number, optionsJson: any, id?: string) {
        this.id = id;
        this.companyId = companyId;
        this.name = name;
        this.basePrice = basePrice;
        this.optionsJson = optionsJson;
    }
}
