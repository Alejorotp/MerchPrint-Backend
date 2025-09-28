import { Controller, Get } from '@nestjs/common';
import { EventsServiceService } from './events-service.service';

@Controller()
export class EventsServiceController {
  constructor(private readonly eventsServiceService: EventsServiceService) {}

  @Get()
  getHello(): string {
    return this.eventsServiceService.getHello();
  }
}
