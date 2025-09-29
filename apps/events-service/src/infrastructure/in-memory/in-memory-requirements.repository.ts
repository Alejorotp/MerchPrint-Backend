// in-memory-requirements.repository.ts

import { RequirementsRepositoryPort } from '../../domain/requirements/requirements.repository.port';
import { Requirements } from '../../domain/requirements/requirements.entity';
import { CreateRequirementsDTO } from '../../application/events/dto/create-requirements.dto';
import { randomUUID } from 'crypto';
import { toRequirementsEntity } from '../../application/events/mappers/requirements.mapper';

export class InMemoryRequirementsRepository implements RequirementsRepositoryPort {
    private requirements: Requirements[] = [];
    async save(requirements: Requirements): Promise<Requirements> {
        this.requirements.push(requirements);
        return requirements;
    }
    async create(dto: CreateRequirementsDTO): Promise<Requirements> {
        const newRequirements = toRequirementsEntity(dto, randomUUID());
        this.requirements.push(newRequirements);
        return newRequirements;
    }
    async findById(id: string): Promise<Requirements | null> {
        const req = this.requirements.find(r => r.id === id);
        return req ?? null;
    }
    async findAll(): Promise<Requirements[]> {
        return this.requirements;
    }
    async findByEventId(eventId: string): Promise<Requirements[]> {
        return this.requirements.filter(r => r.eventId === eventId);
    }
    async deleteById(id: string): Promise<void> {
        this.requirements = this.requirements.filter(r => r.id !== id);
        return;
    }
    async update(requirements: Requirements): Promise<Requirements> {
        const index = this.requirements.findIndex(r => r.id === requirements.id);
        if (index === -1) throw new Error('Requirements not found');
        this.requirements[index] = requirements;
        return requirements;
    }
    async count(): Promise<number> {
        return this.requirements.length;
    }
}
