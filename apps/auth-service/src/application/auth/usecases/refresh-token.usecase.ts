// refresh-token.usecase.ts

import { Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import type { TokenServicePort } from '../../../domain/auth/token.service.port';
import { RefreshTokenDTO } from '../dto/refresh-token.dto';
import { AuthResponseDTO } from '../dto/auth-response.dto';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly tokenService: TokenServicePort,
    ) {}

    async execute(input: RefreshTokenDTO): Promise<AuthResponseDTO> {
        // Verify refresh token
        const payload = this.tokenService.verifyRefreshToken(input.refreshToken);
        if (!payload) {
            throw new Error('Invalid refresh token');
        }

        // Find user by ID from token payload
        const user = await this.userRepo.findById(payload.sub);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate new token pair
        const tokenPayload = {
            sub: user.id!,
            email: user.email,
            roleId: user.roleId,
        };

        const tokenPair = this.tokenService.generateTokenPair(tokenPayload);

        return new AuthResponseDTO(
            tokenPair.accessToken,
            tokenPair.refreshToken,
            user.id!,
            user.email,
            user.name,
            user.roleId,
        );
    }
}
