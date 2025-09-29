// event.mapper.ts

import { Event } from '../../../domain/events/event.entity';
import { eventDTO } from '../dto/event.dto';

export const toEventDTO = (event: Event): eventDTO => ({
    id: event.id,
    name: event.name,
    date: event.date,
    location: event.location,
    userId: event.userId,
});
