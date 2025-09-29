import { Offer } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class GetOffersByAuctionUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(auctionId: string): Promise<Offer[]> {
    if (!auctionId || auctionId.trim() === '') {
      throw new Error('Auction ID is required');
    }

    return this.offerRepo.findByAuctionId(auctionId);
  }
}
