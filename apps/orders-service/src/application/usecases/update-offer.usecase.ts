import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';
import { UpdateOfferDTO } from '../dto/update-offer.dto';

export class UpdateOfferUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(offerId: string, input: UpdateOfferDTO): Promise<Offer> {
    if (!offerId || offerId.trim() === '') {
      throw new Error('Offer ID is required');
    }

    // Find the offer
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    // Validate that offer can be updated (only pending offers)
    if (offer.status !== OfferStatus.PENDING) {
      throw new Error('Only pending offers can be updated');
    }

    // Validate input data
    if (input.price !== undefined && input.price <= 0) {
      throw new Error('Price must be positive');
    }

    if (input.lead_time_days !== undefined && input.lead_time_days <= 0) {
      throw new Error('Lead time must be positive');
    }

    // Update the offer
    const updateData: any = {};

    if (input.price !== undefined) {
      updateData.price = input.price;
    }

    if (input.lead_time_days !== undefined) {
      updateData.lead_time_days = input.lead_time_days;
    }

    if (input.specs_json !== undefined) {
      updateData.specs_json = input.specs_json;
    }

    const updatedOffer = await this.offerRepo.update(offerId, updateData);
    if (!updatedOffer) {
      throw new Error('Failed to update offer');
    }

    return updatedOffer;
  }
}
