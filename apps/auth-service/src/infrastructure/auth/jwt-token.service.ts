// jwt-token.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenServicePort, TokenPayload, TokenPair } from '../../domain/auth/token.service.port';

@Injectable()
export class JwtTokenService implements TokenServicePort {
    constructor(private readonly jwtService: JwtService) {}

    generateAccessToken(payload: TokenPayload): string {
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }

    generateRefreshToken(payload: TokenPayload): string {
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }

    generateTokenPair(payload: TokenPayload): TokenPair {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    verifyAccessToken(token: string): TokenPayload | null {
        try {
            return this.jwtService.verify(token) as TokenPayload;
        } catch (error) {
            return null;
        }
    }

    verifyRefreshToken(token: string): TokenPayload | null {
        try {
            return this.jwtService.verify(token) as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}
