// events.controller.ts

import { CreateEventUseCase } from '../../../application/events/usecases/create-event.usecase';
import { toEventDTO } from '../../../application/events/mappers/event.mapper';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetEventsUseCase } from 'apps/events-service/src/application/events/usecases/get-events.usecase';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly createEvent: CreateEventUseCase, private readonly getEvent: GetEventsUseCase) {}
  @Post()
  async create(
    @Body() body: { name: string; date: Date; location: string; userId: string },
  ) {
    if (!body?.name || !body?.date || !body?.location || !body?.userId)
      throw new Error('name, date, location and userId are required');
    const event = await this.createEvent.execute(body);
    return toEventDTO(event);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const event = await this.getEvent.execute(id);
    if (!event) throw new Error('Event not found');
    return event;
  }

  @Get()
  async getAll() {
    const events = await this.getEvent.executeAll();
    return events;
  }

  @Get('count/all')
  async count() {
    const count = await this.getEvent.count();
    return { count };
  }

}
