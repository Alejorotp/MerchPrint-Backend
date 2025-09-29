// update-event.usecase.ts


import { Inject } from '@nestjs/common';
import { EVENT_REPOSITORY } from '../../tokens';
import { Event } from '../../../infrastructure/mongoose/event.schema';
import { UpdateEventDTO } from '../dto/update-event.dto';
import { EventRepositoryPort } from '../../../domain/events/event.repository.port';
import { toEventDTO } from '../mappers/event.mapper';
import { eventDTO } from '../dto/event.dto';
export class UpdateEventUseCase {
    constructor(private readonly eventRepo: EventRepositoryPort) {}
    async execute(id: string, input: UpdateEventDTO): Promise<eventDTO | null> {
        const existing = await this.eventRepo.findById(id);
        if (!existing) return null;
        existing.name = input.name ?? existing.name;
        existing.date = input.date ?? existing.date;
        existing.location = input.location ?? existing.location;
        existing.userId = input.userId ?? existing.userId;
        const updated = await this.eventRepo.update(existing);
        return toEventDTO(updated);
    }
}
