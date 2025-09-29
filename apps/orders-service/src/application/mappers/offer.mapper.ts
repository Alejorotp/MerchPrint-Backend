import { Offer } from '../../domain/entities/offer.entity';
import { OfferDTO } from '../dto/create-offer.dto';

export class OfferMapper {
  static toDTO(offer: Offer): OfferDTO {
    return {
      id: offer.id,
      auction_id: offer.auction_id,
      company_id: offer.company_id,
      price: offer.price,
      lead_time_days: offer.lead_time_days,
      status: offer.status,
      created_at: offer.created_at,
      specs_json: offer.specs_json,
    };
  }

  static toDTOList(offers: Offer[]): OfferDTO[] {
    return offers.map((offer) => this.toDTO(offer));
  }
}
