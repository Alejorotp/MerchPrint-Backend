// user.repository.port.ts

import { User } from "./user.entity";

export interface UserRepositoryPort {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    existsByEmail(email: string): Promise<boolean>;
}
