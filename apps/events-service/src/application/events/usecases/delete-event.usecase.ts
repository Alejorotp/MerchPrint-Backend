// delete-event.usecase.ts

import { EventRepositoryPort } from '../../../domain/events/event.repository.port';
import { eventDTO } from '../dto/event.dto';
import { toEventDTO } from '../mappers/event.mapper';

export class DeleteEventUseCase {
    constructor(private readonly eventRepo: EventRepositoryPort) {}
    async execute(id: string): Promise<eventDTO | null> {
        const existing = await this.eventRepo.findById(id); // fetch the Event object
        if (!existing) return null;
        await this.eventRepo.deleteById(id);
        return toEventDTO(existing);
    }
}