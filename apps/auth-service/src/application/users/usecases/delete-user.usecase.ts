// delete-user.usecase.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';

export class DeleteUserUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(userId: string) {
        const userExists = await this.userRepo.existsById(userId);
        if (!userExists) throw new Error('User not found');
        return this.userRepo.deleteById(userId);
    }
}