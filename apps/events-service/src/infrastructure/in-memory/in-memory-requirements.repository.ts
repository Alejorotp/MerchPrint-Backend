// in-memory-requirements.repository.ts

import { RequirementsRepositoryPort } from '../../domain/requirements/requirements.repository.port';
import { Requirements } from '../../domain/requirements/requirements.entity';
import { CreateRequirementsDTO } from '../../application/requirements/dto/create-requirements.dto';
import { randomUUID } from 'crypto';

export class InMemoryRequirementsRepository implements RequirementsRepositoryPort {
    private requirements: Requirements[] = [];
    async save(requirements: Requirements): Promise<Requirements> {
        this.requirements.push(requirements);
        return requirements;
    }
    async create(dto: CreateRequirementsDTO): Promise<Requirements> {
        const newRequirements = new Requirements(randomUUID(), dto.eventId, dto.description, dto.quantity, dto.specs_json);
        this.requirements.push(newRequirements);
        return newRequirements;
    }
    async findById(id: string): Promise<Requirements | null> {
        const found = this.requirements.find(req => req.id === id);
        return found || null;
    }
    async findAll(): Promise<Requirements[]> {
        return this.requirements;
    }
    async findByEventId(eventId: string): Promise<Requirements[]> {
        return this.requirements.filter(req => req.eventId === eventId);
    }

    async deleteById(id: string): Promise<void> {
        this.requirements = this.requirements.filter(req => req.id !== id);
    }

    async update(requirements: Requirements): Promise<Requirements> {
        const index = this.requirements.findIndex(req => req.id === requirements.id);
        if (index === -1) throw new Error('Requirements not found');
        this.requirements[index] = requirements;
        return requirements;
    }
    async count(): Promise<number> {
        return this.requirements.length;
    }
}
