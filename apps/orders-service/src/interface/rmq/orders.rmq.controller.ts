import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetOrderByIdUseCase } from '../../application/usecases/get-order-by-id.usecase';

@Controller()
export class OrdersRmqController {
  constructor(private readonly getOrderById: GetOrderByIdUseCase) {}

  @MessagePattern('orders.getById')
  async getById(@Payload() id: string) {
    return this.getOrderByIdUseCase(id);
  }

  private async getOrderByIdUseCase(id: string) {
    return this.getOrderById.execute(id);
  }
}
