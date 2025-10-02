import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({
    description: 'ID único de la orden',
  })
  id: string;

  @ApiProperty({
    description: 'ID del cliente que realiza la orden',
  })
  client_id: string;

  @ApiProperty({
    description: 'ID de la oferta aceptada',
  })
  offer_id: string;

  @ApiProperty({
    description: 'Estado actual de la orden',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Fecha de creación de la orden',
    example: '2021-06-21T09:00:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Fecha de última actualización de la orden',
    example: '2021-06-21T10:30:00.000Z',
  })
  updated_at: Date;
}
