// update-user.dto.ts

import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'John Doe' })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'hashed_password' })
    password_hash?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'roleId' })
    roleId?: string;
}