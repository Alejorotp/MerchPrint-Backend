import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

function isObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

@Controller('events')
export class EventsGatewayController {
  constructor(
    @Inject('EVENTS_SERVICE') private readonly eventsClient: ClientProxy,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    return firstValueFrom(this.eventsClient.send('events.getById', id));
  }
}
