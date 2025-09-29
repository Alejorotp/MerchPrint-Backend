// events.controller.ts

import { CreateEventUseCase } from '../../../application/events/usecases/create-event.usecase';
import { toEventDTO } from '../../../application/events/mappers/event.mapper';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly createEvent: CreateEventUseCase) {}
  @Post()
  async create(
    @Body() body: { name: string; date: Date; location: string; userId: string },
  ) {
    if (!body?.name || !body?.date || !body?.location || !body?.userId)
      throw new Error('name, date, location and userId are required');
    const event = await this.createEvent.execute(body);
    return toEventDTO(event);
  }
}
