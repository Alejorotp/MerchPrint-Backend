import { OrderStatus } from '../../domain/entities/order.entity';

type UpdateOrderStatusDTO = {
  status: OrderStatus;
};

export type { UpdateOrderStatusDTO };
