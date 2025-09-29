import { randomUUID } from 'crypto';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';
import { CreateOrderDTO } from '../dto/create-order.dto';

export class CreateOrderUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) { }

  async execute(input: CreateOrderDTO): Promise<Order> {
    const order = new Order(
      randomUUID(),
      input.client_id,
      null, // no offer assigned initially
      OrderStatus.PENDING,
      new Date(),
      new Date(),
    );
    return this.orderRepo.save(order);
  }
}
