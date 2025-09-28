import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
