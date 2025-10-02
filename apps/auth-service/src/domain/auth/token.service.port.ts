// token.service.port.ts

export interface TokenPayload {
    sub: string; // user id
    email: string;
    roleId: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface TokenServicePort {
    generateAccessToken(payload: TokenPayload): string;
    generateRefreshToken(payload: TokenPayload): string;
    generateTokenPair(payload: TokenPayload): TokenPair;
    verifyAccessToken(token: string): TokenPayload | null;
    verifyRefreshToken(token: string): TokenPayload | null;
}
