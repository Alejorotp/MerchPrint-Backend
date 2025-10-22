import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetEventsUseCase } from '../../application/events/usecases/get-events.usecase';

@Controller()
export class EventsRmqController {
  constructor(private readonly getEvents: GetEventsUseCase) {}

  @MessagePattern('events.getById')
  async getById(@Payload() id: string) {
    return this.getEvents.execute(id);
  }
}
