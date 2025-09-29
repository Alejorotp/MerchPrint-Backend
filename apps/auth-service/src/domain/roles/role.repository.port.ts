// role.repository.port.ts

import { Role } from './role.entity';

export interface RoleRepositoryPort {
    save(role: Role): Promise<Role>;
    findById(id: string): Promise<Role | null>;
    findAll(): Promise<Role[]>;
    delete(id: string): Promise<void>;
    existsByName(name: string): Promise<boolean>;
    existsById(id: string): Promise<boolean>;
    update(id: string, update: Partial<Role>): Promise<Role | null>;
}