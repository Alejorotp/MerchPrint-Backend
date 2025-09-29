import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class DeleteOrderUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) {}

  async execute(orderId: string): Promise<void> {
    if (!orderId || orderId.trim() === '') {
      throw new Error('Order ID is required');
    }

    // Check if order exists
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Delete the order
    const deleted = await this.orderRepo.delete(orderId);
    if (!deleted) {
      throw new Error('Failed to delete order');
    }
  }
}
