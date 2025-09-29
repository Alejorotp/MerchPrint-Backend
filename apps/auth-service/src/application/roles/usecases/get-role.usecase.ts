// get-role.usecase.ts

import { Role } from '../../../domain/roles/role.entity';
import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';

export class GetRoleUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(id: string): Promise<Role | null> {
        return this.roleRepo.findById(id);
    }
}