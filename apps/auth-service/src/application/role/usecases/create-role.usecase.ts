// create-role.usecase.ts

import { randomUUID } from 'crypto';
import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';
import { CreateRoleDTO } from '../dto/create-role.dto';
import { Role } from 'apps/auth-service/src/domain/roles/role.entity';

export class CreateRoleUseCase {
    constructor(private readonly roleRepo: RoleRepositoryPort) {}

    async execute(input: CreateRoleDTO) {
        const roleExists = await this.roleRepo.existsByName(input.name);
        if (roleExists) throw new Error('Role already exists');
        const role = new Role(randomUUID().toString(), input.name, input.permissions);
        return this.roleRepo.save(role);
    }
}