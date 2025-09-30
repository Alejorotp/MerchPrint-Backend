import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'ID del cliente que realiza la orden',
  })
  client_id: string;

  @ApiProperty({
    description: 'ID de la oferta aceptada',
  })
  offer_id: string;
}
