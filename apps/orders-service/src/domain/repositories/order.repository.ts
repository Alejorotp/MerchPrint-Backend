import { Order, OrderStatus } from '../entities/order.entity';

export interface OrderRepositoryPort {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByClientId(clientId: string): Promise<Order[]>;
  findByOfferId(offerId: string): Promise<Order | null>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  update(id: string, order: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
}
