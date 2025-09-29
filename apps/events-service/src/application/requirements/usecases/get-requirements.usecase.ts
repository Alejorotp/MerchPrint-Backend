// get-requirements.usecase.ts

import { RequirementsRepositoryPort } from '../../../domain/requirements/requirements.repository.port';
import { RequirementsDTO } from '../dto/requirements.dto';
import { toRequirementsDTO } from '../mappers/requirements.mapper';
import { Requirements } from '../../../domain/requirements/requirements.entity';

export class GetRequirementsUseCase {
    constructor(private readonly requirementsRepo: RequirementsRepositoryPort) {}
    async execute(id: string): Promise<RequirementsDTO | null> {
        const found: Requirements | null = await this.requirementsRepo.findById(id);
        if (!found) return null;
        return toRequirementsDTO(found);
    }
    async executeAll(): Promise<RequirementsDTO[]> {
        const found: Requirements[] = await this.requirementsRepo.findAll();
        return found.map(req => toRequirementsDTO(req));
    }
    async executeByEventId(eventId: string): Promise<RequirementsDTO[]> {
        const found: Requirements[] = await this.requirementsRepo.findByEventId(eventId);
        return found.map(req => toRequirementsDTO(req));
    }

    async count(): Promise<number> {
        return this.requirementsRepo.count();
    }
}