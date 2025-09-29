// get-all-users.usecase.ts

import { User } from '../../../domain/users/user.entity';
import { UserRepositoryPort } from '../../../domain/users/user.repository.port';

export class GetAllUsersUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(): Promise<User[]> {
        return this.userRepo.findAll();
    }
}