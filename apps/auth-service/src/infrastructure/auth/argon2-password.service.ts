// argon2-password.service.ts

import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { PasswordServicePort } from '../../domain/auth/password.service.port';

@Injectable()
export class Argon2PasswordService implements PasswordServicePort {
    async hash(password: string): Promise<string> {
        return argon2.hash(password);
    }

    async verify(password: string, hash: string): Promise<boolean> {
        try {
            return await argon2.verify(hash, password);
        } catch (error) {
            return false;
        }
    }
}
