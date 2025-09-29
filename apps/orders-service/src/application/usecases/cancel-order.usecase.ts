import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class CancelOrderUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) {}

  async execute(orderId: string): Promise<Order> {
    if (!orderId || orderId.trim() === '') {
      throw new Error('Order ID is required');
    }

    // Find the order
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Validate that order can be cancelled
    if (order.status === OrderStatus.COMPLETED) {
      throw new Error('Cannot cancel completed order');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }

    // Update order status to cancelled
    const updatedOrder = await this.orderRepo.update(orderId, {
      status: OrderStatus.CANCELLED,
      updated_at: new Date(),
    });

    if (!updatedOrder) {
      throw new Error('Failed to cancel order');
    }

    return updatedOrder;
  }
}
