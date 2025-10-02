// password.service.port.ts

export interface PasswordServicePort {
    hash(password: string): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
}
