// create-user.usecase.ts

import { randomUUID } from 'crypto';
import { User } from '../../../domain/users/user.entity';
import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { CreateUserDTO } from '../dto/create-user.dto';

export class CreateUserUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(input: CreateUserDTO) {
        const emailTaken = await this.userRepo.existsByEmail(input.email);
        if (emailTaken) throw new Error('Email already in use');
        const user = new User(randomUUID().toString(), input.email, input.name, input.password, input.roleId);
        return this.userRepo.save(user);
    }
}