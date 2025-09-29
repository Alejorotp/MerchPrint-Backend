// delete-requirements.usecase.ts

import { RequirementsRepositoryPort } from '../../../domain/requirements/requirements.repository.port';

export class DeleteRequirementsUseCase {
    constructor(private readonly requirementsRepo: RequirementsRepositoryPort) {}
    async execute(id: string): Promise<boolean> {
        const existing = await this.requirementsRepo.findById(id);
        if (!existing) return false;
        await this.requirementsRepo.deleteById(id);
        return true;
    }   
}

