// update-role.usecase.ts

import { Role } from '../../../domain/roles/role.entity';
import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';

export class UpdateRoleUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(id: string, update: Partial<Role>): Promise<Role | null> {
        return this.roleRepo.update(id, update);
    }
}