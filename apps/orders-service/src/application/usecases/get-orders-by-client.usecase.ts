import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class GetOrdersByClientUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) {}

  async execute(clientId: string): Promise<Order[]> {
    if (!clientId || clientId.trim() === '') {
      throw new Error('Client ID is required');
    }

    return this.orderRepo.findByClientId(clientId);
  }
}
