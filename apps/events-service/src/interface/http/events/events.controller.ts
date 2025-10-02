import { CreateEventUseCase } from '../../../application/events/usecases/create-event.usecase';
import { toEventDTO } from '../../../application/events/mappers/event.mapper';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'; // <-- Import the decorators
import { GetEventsUseCase } from 'apps/events-service/src/application/events/usecases/get-events.usecase';
import { UpdateEventUseCase } from 'apps/events-service/src/application/events/usecases/update-event.usecase';
import { DeleteEventUseCase } from 'apps/events-service/src/application/events/usecases/delete-event.usecase';
import { CreateEventDTO } from 'apps/events-service/src/application/events/dto/create-event.dto';
import { UpdateEventDTO } from 'apps/events-service/src/application/events/dto/update-event.dto';
import { eventDTO as EventDTO} from 'apps/events-service/src/application/events/dto/event.dto';


@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly createEvent: CreateEventUseCase,
    private readonly getEvent: GetEventsUseCase,
    private readonly updateEvent: UpdateEventUseCase,
    private readonly deleteEvent: DeleteEventUseCase,
  ) {}

  // POST /events
  @Post()
  @ApiOperation({ summary: 'Creates an event' })
  @ApiBody({ type: CreateEventDTO }) // Document the request body
  @ApiResponse({ status: 201, description: 'Event created', type: EventDTO }) // Document a successful response
  async create(
    @Body() body: CreateEventDTO, // Use the DTO type for better documentation
  ) {
    if (!body?.name || !body?.date || !body?.location || !body?.userId)
      throw new Error('name, date, location and userId are required');
    const event = await this.createEvent.execute(body);
    return toEventDTO(event);
  }

  // GET /events/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique ID of the event',
  })
  @ApiResponse({ status: 200, description: 'Event found', type: EventDTO })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getById(@Param('id') id: string) {
    const event = await this.getEvent.execute(id);
    if (!event) throw new Error('Event not found');
    return event;
  }

  // GET /events
  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: [EventDTO],
  }) // Return an array of EventDTO
  async getAll() {
    const events = await this.getEvent.executeAll();
    return events;
  }

  // GET /events/count/all
  @Get('count/all')
  @ApiOperation({ summary: 'Get total event count' })
  @ApiResponse({
    status: 200,
    description: 'Total number of events',
    type: Number,
  })
  async count() {
    const count = await this.getEvent.count();
    return { count };
  }

  // PUT /events/update/:id
  @Put('update/:id')
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique ID of the event to update',
  })
  @ApiBody({ type: UpdateEventDTO }) // Document the request body for update
  @ApiResponse({
    status: 200,
    description: 'Event updated successfully',
    type: EventDTO,
  })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async update(@Param('id') id: string, @Body() body: UpdateEventDTO) {
    if (!body?.name && !body?.date && !body?.location && !body?.userId)
      throw new Error(
        'At least one field (name, date, location, userId) must be provided for update',
      );

    const updatedEvent = await this.updateEvent.execute(id, body);
    return updatedEvent;
  }

  // DELETE /events/delete/:id
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique ID of the event to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Event deleted successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found or could not be deleted',
  })
  async delete(@Param('id') id: string) {
    if (!id) throw new Error('Event id is required for deletion');
    const deletedEvent = await this.deleteEvent.execute(id);
    if (!deletedEvent)
      throw new Error('Event not found or could not be deleted');
    return deletedEvent;
  }
}
