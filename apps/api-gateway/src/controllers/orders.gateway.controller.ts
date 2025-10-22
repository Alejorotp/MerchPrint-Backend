import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

function isObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

@Controller('orders')
export class OrdersGatewayController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersClient: ClientProxy,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!isObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    return firstValueFrom(this.ordersClient.send('orders.getById', id));
  }
}
