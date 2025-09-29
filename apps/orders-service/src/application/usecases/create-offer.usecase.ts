import { randomUUID } from 'crypto';
import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';
import { CreateOfferDTO } from '../dto/create-offer.dto';

export class CreateOfferUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) { }

  async execute(input: CreateOfferDTO): Promise<Offer> {
    // Validate that price and lead time are positive
    if (input.price <= 0) {
      throw new Error('Price must be positive');
    }
    if (input.lead_time_days <= 0) {
      throw new Error('Lead time must be positive');
    }

    const offer = new Offer(
      randomUUID(),
      input.auction_id,
      input.company_id,
      input.price,
      input.lead_time_days,
      OfferStatus.PENDING,
      new Date(),
      input.specs_json || {},
    );

    return this.offerRepo.save(offer);
  }
}
