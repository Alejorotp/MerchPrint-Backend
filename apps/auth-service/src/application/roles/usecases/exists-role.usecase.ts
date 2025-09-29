// exists-role.usecase.ts

import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';

export class ExistsRoleByNameUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(name: string): Promise<boolean> {
        return this.roleRepo.existsByName(name);
    }
}

export class ExistsRoleByIdUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(id: string): Promise<boolean> {
        return this.roleRepo.existsById(id);
    }
}