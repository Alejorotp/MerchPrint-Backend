// create-event.usecase.ts

import { randomUUID } from 'crypto';
import { Event } from '../../../domain/events/event.entity';
import { EventRepositoryPort } from '../../../domain/events/event.repository.port';
import { CreateEventDTO } from '../dto/create-event.dto';
import { toEventDTO } from '../mappers/event.mapper';
import { eventDTO } from '../dto/event.dto';

export class CreateEventUseCase {
    constructor(private readonly eventRepo: EventRepositoryPort) {}
    async execute(input: CreateEventDTO): Promise<eventDTO> {
        const titleTaken = await this.eventRepo.existsByTitle(input.name);
        if (titleTaken) throw new Error('Event title already in use');
        const event = new Event(randomUUID(), input.userId, input.name, input.date, input.location);
        const savedEvent = await this.eventRepo.save(event);
        return toEventDTO(savedEvent);
        
    }
}
