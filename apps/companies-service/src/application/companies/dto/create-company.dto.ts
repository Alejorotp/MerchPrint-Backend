// create-company.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'user-123', description: 'The ID of the user who owns the company' })
    userId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Acme Corp', description: 'The name of the company' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'contact@example.com', description: 'The contact email for the company' })
    contactEmail: string;
}