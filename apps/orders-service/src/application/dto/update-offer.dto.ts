import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOfferDTO {
  @ApiPropertyOptional({
    description: 'Nuevo precio de la oferta',
    example: 1600.75,
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'Nuevo tiempo de entrega en días',
    example: 5,
  })
  lead_time_days?: number;

  @ApiPropertyOptional({
    description: 'Nuevas especificaciones en formato JSON',
    example: { color: 'azul', material: 'poliéster' },
  })
  specs_json?: JSON;
}
