// exists-by-email.usecase.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';

export class ExistsByEmailUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(email: string): Promise<boolean> {
        return this.userRepo.existsByEmail(email);
    }
}

// exists-by-id.usecase.ts

export class ExistsByIdUseCase {
    constructor(private readonly userRepo: UserRepositoryPort) {}

    async execute(id: string): Promise<boolean> {
        return this.userRepo.existsById(id);
    }
}