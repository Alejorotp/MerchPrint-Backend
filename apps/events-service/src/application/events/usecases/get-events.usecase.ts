// get-events.usecase.ts

import { Event } from '../../../domain/events/event.entity';
import { EventRepositoryPort } from '../../../domain/events/event.repository.port';
import { eventDTO } from '../dto/event.dto';
import { toEventDTO } from '../mappers/event.mapper';

export class GetEventsUseCase {
    constructor(private readonly eventRepo: EventRepositoryPort) {}
    async execute(id: string): Promise<eventDTO | null> {
        const found: Event | null = await this.eventRepo.findById(id);
        if (!found) return null;
        return toEventDTO(found);
    }

    async executeAll(): Promise<eventDTO[]> {
        const found: Event[] = await this.eventRepo.findAll();
        return found.map(event => toEventDTO(event));
    }
    async executeByUserId(userId: string): Promise<eventDTO[]> {
        const found: Event[] = await this.eventRepo.findByUserId(userId);
        return found.map(event => toEventDTO(event));
    }
    async count(): Promise<number> {
        return this.eventRepo.count();
    }
}