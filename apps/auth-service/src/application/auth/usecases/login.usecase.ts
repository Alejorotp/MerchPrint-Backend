// login.usecase.ts

import { Injectable } from '@nestjs/common';
import type { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import type { PasswordServicePort } from '../../../domain/auth/password.service.port';
import type { TokenServicePort } from '../../../domain/auth/token.service.port';
import { LoginDTO } from '../dto/login.dto';
import { AuthResponseDTO } from '../dto/auth-response.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly passwordService: PasswordServicePort,
        private readonly tokenService: TokenServicePort,
    ) {}

    async execute(input: LoginDTO): Promise<AuthResponseDTO> {
        // Find user by email
        const user = await this.userRepo.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await this.passwordService.verify(input.password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate tokens
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
