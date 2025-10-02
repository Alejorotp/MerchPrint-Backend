import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../domain/entities/order.entity';

export class UpdateOrderStatusDTO {
  @ApiProperty({
    description: 'Nuevo estado de la orden',
    enum: OrderStatus,
    example: OrderStatus,
  })
  status: OrderStatus;
}
