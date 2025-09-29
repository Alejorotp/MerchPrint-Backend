// role.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class RoleDTO {
    @IsString()
    @ApiProperty({ example: 'role-id-123', description: 'The unique identifier of the role' })
    id: string;

    @ApiProperty({ example: 'Admin', description: 'The name of the role' })
    @IsString()
    name: string;

    @ApiProperty({ example: ['read', 'write'], description: 'The permissions assigned to the role' })
    @IsArray()
    permissions: string[];
}