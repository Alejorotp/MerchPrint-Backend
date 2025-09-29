// update-company.dto.ts

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ example: 'Acme Corp', description: 'The name of the company' })
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ example: 'contact@example.com', description: 'The contact email for the company' })
    contactEmail?: string;
}