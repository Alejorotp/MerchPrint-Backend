// company.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CompanyDTO {
    @ApiProperty()
    public readonly id?: string;

    @ApiProperty()
    public readonly userId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public contactEmail: string;

    constructor(userId: string, name: string, contactEmail: string, id?: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.contactEmail = contactEmail;
    }
}