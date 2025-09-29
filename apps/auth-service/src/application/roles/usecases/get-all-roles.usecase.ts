// get-all-roles.usecase.ts

import { Role } from '../../../domain/roles/role.entity';
import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';

export class GetAllRolesUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(): Promise<Role[]> {
        return this.roleRepo.findAll();
    }
}