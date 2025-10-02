// user.repository.port.ts

import { User } from "./user.entity";

export interface UserRepositoryPort {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    existsByEmail(email: string): Promise<boolean>;
    existsById(id: string): Promise<boolean>;
    deleteById(id: string): Promise<void>;
    update(user: User): Promise<User>;
}
