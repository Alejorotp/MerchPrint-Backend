// create-role.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Company', description: 'The name of the role' })
    name: string;

    @IsNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ example: ['read', 'write'], description: 'The endpoints permitted to the role' })
    permissions: string[];
};