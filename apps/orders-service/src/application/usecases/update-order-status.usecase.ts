import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';
import { UpdateOrderStatusDTO } from '../dto/update-order-status.dto';

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepo: OrderRepositoryPort) {}

  async execute(orderId: string, input: UpdateOrderStatusDTO): Promise<Order> {
    if (!orderId || orderId.trim() === '') {
      throw new Error('Order ID is required');
    }

    if (!input.status) {
      throw new Error('Status is required');
    }

    // Validate status is a valid OrderStatus
    if (!Object.values(OrderStatus).includes(input.status)) {
      throw new Error('Invalid status provided');
    }

    // Find the order first
    const existingOrder = await this.orderRepo.findById(orderId);
    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // Validate status transition (optional business rules)
    this.validateStatusTransition(existingOrder.status, input.status);

    // Update the order
    const updatedOrder = await this.orderRepo.update(orderId, {
      status: input.status,
      updated_at: new Date(),
    });

    if (!updatedOrder) {
      throw new Error('Failed to update order status');
    }

    return updatedOrder;
  }

  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ): void {
    // Business rules for valid status transitions
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED],
      [OrderStatus.IN_PROGRESS]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [], // Terminal state
      [OrderStatus.CANCELLED]: [], // Terminal state
    };

    const allowedTransitions = validTransitions[currentStatus];
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}
