import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOfferDTO {
  @ApiProperty({
    description: 'ID de la subasta para la cual se crea la oferta',
  })
  auction_id: string;

  @ApiProperty({
    description: 'ID de la empresa que realiza la oferta',
  })
  company_id: string;

  @ApiProperty({
    description: 'Precio de la oferta',
    example: 1500.5,
  })
  price: number;

  @ApiProperty({
    description: 'Tiempo de entrega en días',
    example: 7,
  })
  lead_time_days: number;

  @ApiPropertyOptional({
    description: 'Especificaciones adicionales en formato JSON',
    example: { color: 'rojo', material: 'algodón' },
  })
  specs_json?: JSON;
}

export class OfferDTO {
  @ApiProperty({
    description: 'ID único de la oferta',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la subasta',
  })
  auction_id: string;

  @ApiProperty({
    description: 'ID de la empresa',
  })
  company_id: string;

  @ApiProperty({
    description: 'Precio de la oferta',
    example: 1500.5,
  })
  price: number;

  @ApiProperty({
    description: 'Tiempo de entrega en días',
    example: 7,
  })
  lead_time_days: number;

  @ApiProperty({
    description: 'Estado de la oferta',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Fecha de creación de la oferta',
    example: '2021-06-21T09:00:00.000Z',
  })
  created_at: Date;

  @ApiPropertyOptional({
    description: 'Especificaciones adicionales en formato JSON',
    example: { color: 'rojo', material: 'algodón' },
  })
  specs_json?: JSON;
}
