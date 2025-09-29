// delete-role.ts

import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';

export class DeleteRoleUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(id: string): Promise<void> {
        return this.roleRepo.delete(id);
    }
}