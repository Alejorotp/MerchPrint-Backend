import { Offer } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class GetOfferByIdUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(offerId: string): Promise<Offer | null> {
    if (!offerId || offerId.trim() === '') {
      throw new Error('Offer ID is required');
    }

    return this.offerRepo.findById(offerId);
  }
}
