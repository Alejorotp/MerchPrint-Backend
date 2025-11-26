import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEventUseCase } from '../../application/events/usecases/create-event.usecase';
import { GetEventsUseCase } from '../../application/events/usecases/get-events.usecase';
import { UpdateEventUseCase } from '../../application/events/usecases/update-event.usecase';
import { DeleteEventUseCase } from '../../application/events/usecases/delete-event.usecase';
import { toEventDTO } from '../../application/events/mappers/event.mapper';
import { CreateEventDTO } from '../../application/events/dto/create-event.dto';
import { UpdateEventDTO } from '../../application/events/dto/update-event.dto';

@Controller()
export class EventsRmqController {
  constructor(
    private readonly createEvent: CreateEventUseCase,
    private readonly getEvents: GetEventsUseCase,
    private readonly updateEvent: UpdateEventUseCase,
    private readonly deleteEvent: DeleteEventUseCase,
  ) { }

  @MessagePattern('events.create')
  async create(@Payload() data: CreateEventDTO) {
    const event = await this.createEvent.execute(data);
    return toEventDTO(event);
  }

  @MessagePattern('events.getAll')
  async getAll() {
    const events = await this.getEvents.executeAll();
    return events.map(toEventDTO);
  }

  @MessagePattern('events.getById')
  async getById(@Payload() id: string) {
    const event = await this.getEvents.execute(id);
    if (!event) return null;
    return toEventDTO(event);
  }

  @MessagePattern('events.update')
  async update(@Payload() data: { id: string; body: UpdateEventDTO }) {
    const event = await this.updateEvent.execute(data.id, data.body);
    if (!event) return null;
    return toEventDTO(event);
  }

  @MessagePattern('events.delete')
  async delete(@Payload() id: string) {
    await this.deleteEvent.execute(id);
    return { message: 'Event deleted successfully' };
  }

  @MessagePattern('events.getByUserId')
  async getByUserId(@Payload() user_id: string) {
    const events = await this.getEvents.executeByUserId(user_id);
    return events.map(toEventDTO);
  }

}
