import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class GetOrderByIdUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) {}

  async execute(orderId: string): Promise<Order | null> {
    if (!orderId || orderId.trim() === '') {
      throw new Error('Order ID is required');
    }

    return this.orderRepo.findById(orderId);
  }
}
