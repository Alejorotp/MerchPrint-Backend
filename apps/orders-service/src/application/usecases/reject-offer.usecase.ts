import { Offer } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class RejectOfferUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(offerId: string): Promise<Offer> {
    if (!offerId || offerId.trim() === '') {
      throw new Error('Offer ID is required');
    }

    // Find the offer
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    // Validate that offer can be rejected
    if (!offer.isValid()) {
      throw new Error('Offer cannot be rejected - it is not in a valid state');
    }

    // Reject the offer
    offer.reject();

    // Update the offer in repository
    const updatedOffer = await this.offerRepo.update(offerId, offer);
    if (!updatedOffer) {
      throw new Error('Failed to reject offer');
    }

    return updatedOffer;
  }
}
