// update-user.usecase.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../../../domain/users/user.entity';

export class UpdateUserUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(userId: string, input: UpdateUserDTO): Promise<User | null> {
        const user = await this.userRepo.findById(userId);
        if (!user) return null;

        if (input.name) user.name = input.name;
        if (input.password_hash) user.password_hash = input.password_hash;

        return this.userRepo.save(user);
    }
}