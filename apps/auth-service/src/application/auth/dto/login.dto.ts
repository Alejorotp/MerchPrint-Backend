// login.dto.ts

import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'password123', description: 'User password' })
    password: string;
}
