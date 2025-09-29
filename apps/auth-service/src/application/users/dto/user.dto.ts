// user.dto.ts

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @IsNotEmpty()
    @ApiProperty({ example: 'userId' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'roleId' })
    roleId: string;
}