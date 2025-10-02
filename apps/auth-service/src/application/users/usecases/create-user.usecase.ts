// create-user.usecase.ts

import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/user.entity';
import type { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import type { PasswordServicePort } from '../../../domain/auth/password.service.port';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ExistsRoleByIdUseCase } from '../../roles/usecases/exists-role.usecase';

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepo: UserRepositoryPort,
        private readonly passwordService: PasswordServicePort,
        private readonly existsRoleById: ExistsRoleByIdUseCase,
    ) {}

    async execute(input: CreateUserDTO) {
        const emailTaken = await this.userRepo.existsByEmail(input.email);
        if (emailTaken) throw new Error('Email already in use');
        
        const roleExists = await this.existsRoleById.execute(input.roleId);
        if (!roleExists) throw new Error('Role not found');
        
        const passwordHash = await this.passwordService.hash(input.password);
        const user = new User(input.email, input.name, passwordHash, input.roleId);
        return this.userRepo.save(user);
    }
}