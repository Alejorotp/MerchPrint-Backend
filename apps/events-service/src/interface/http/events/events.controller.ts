// events.controller.ts

import { CreateEventUseCase } from '../../../application/events/usecases/create-event.usecase';
import { toEventDTO } from '../../../application/events/mappers/event.mapper';
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetEventsUseCase } from 'apps/events-service/src/application/events/usecases/get-events.usecase';
import { UpdateEventUseCase } from 'apps/events-service/src/application/events/usecases/update-event.usecase';
import { DeleteEventUseCase } from 'apps/events-service/src/application/events/usecases/delete-event.usecase';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly createEvent: CreateEventUseCase, private readonly getEvent: GetEventsUseCase, private readonly updateEvent: UpdateEventUseCase, private readonly deleteEvent: DeleteEventUseCase) {}
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

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: { name?: string; date?: Date; location?: string; userId?: string }) {
    if (!body?.name && !body?.date && !body?.location && !body?.userId)
      throw new Error('At least one field (name, date, location, userId) must be provided for update');
    const updatedEvent = await this.updateEvent.execute(id, body);
    return updatedEvent;
  } 

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    if (!id) throw new Error('Event id is required for deletion');
    const deletedEvent = await this.deleteEvent.execute(id);
    if (!deletedEvent) throw new Error('Event not found or could not be deleted');
    return deletedEvent;
  }


}
