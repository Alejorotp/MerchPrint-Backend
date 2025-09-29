import { OfferStatus } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class DeleteOfferUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(offerId: string): Promise<void> {
    if (!offerId || offerId.trim() === '') {
      throw new Error('Offer ID is required');
    }

    // Check if offer exists
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    // Validate that offer can be deleted (only pending offers)
    if (offer.status !== OfferStatus.PENDING) {
      throw new Error('Only pending offers can be deleted');
    }

    // Delete the offer
    const deleted = await this.offerRepo.delete(offerId);
    if (!deleted) {
      throw new Error('Failed to delete offer');
    }
  }
}
