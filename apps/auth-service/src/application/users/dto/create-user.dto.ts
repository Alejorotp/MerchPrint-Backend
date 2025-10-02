// create-user.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'roleId' })
    @IsNotEmpty()
    roleId: string;
};