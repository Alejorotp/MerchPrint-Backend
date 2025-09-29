// get-user.usecase.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { User } from '../../../domain/users/user.entity';

export class GetUserUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(userId: string): Promise<User | null> {
        return this.userRepo.findById(userId);
    }
}