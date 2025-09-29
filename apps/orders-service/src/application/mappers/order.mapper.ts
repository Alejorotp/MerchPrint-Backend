import { Order } from '../../domain/entities/order.entity';
import { OrderDTO } from '../dto/order.dto';

export class OrderMapper {
  static toDTO(order: Order): OrderDTO {
    return {
      id: order.id,
      client_id: order.client_id,
      offer_id: order.offer_id,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
    };
  }

  static toDTOList(orders: Order[]): OrderDTO[] {
    return orders.map((order) => this.toDTO(order));
  }
}
