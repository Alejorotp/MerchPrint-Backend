// auth-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT access token' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT refresh token' })
    refreshToken: string;

    @ApiProperty({ example: 'user123', description: 'User ID' })
    userId: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'John Doe', description: 'User name' })
    name: string;

    @ApiProperty({ example: 'role123', description: 'User role ID' })
    roleId: string;

    constructor(accessToken: string, refreshToken: string, userId: string, email: string, name: string, roleId: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.roleId = roleId;
    }
}
