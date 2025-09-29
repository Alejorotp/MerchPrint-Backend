// update-role.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDTO {
    @ApiProperty({ example: 'Admin', description: 'The name of the role' })
    name!: string;

    @ApiProperty({ example: 'Administrator role with full permissions', description: 'The description of the role' })
    description!: string;
}