import { randomUUID } from 'crypto';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OfferStatus } from '../../domain/entities/offer.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class AcceptOfferUseCase {
  constructor(
    private readonly orderRepo: OrderRepositoryPort,
    private readonly offerRepo: OfferRepositoryPort,
  ) {}

  async execute(clientId: string, offerId: string): Promise<Order> {
    // Find the offer
    const offer = await this.offerRepo.findById(offerId);
    if (!offer) {
      throw new Error('Offer not found');
    }

    // Validate offer can be accepted
    if (!offer.isValid()) {
      throw new Error('Offer is not valid for acceptance');
    }

    // Accept the offer
    offer.accept();
    await this.offerRepo.update(offerId, offer);

    // Reject other offers for the same auction
    const otherOffers = await this.offerRepo.findByAuctionId(offer.auction_id);
    for (const otherOffer of otherOffers) {
      if (
        otherOffer.id !== offerId &&
        otherOffer.status === OfferStatus.PENDING
      ) {
        otherOffer.reject();
        await this.offerRepo.update(otherOffer.id, otherOffer);
      }
    }

    // Create a new order with the accepted offer
    const order = new Order(
      randomUUID(),
      clientId,
      offerId,
      OrderStatus.IN_PROGRESS,
      new Date(),
      new Date(),
    );

    const savedOrder = await this.orderRepo.save(order);
    if (!savedOrder) {
      throw new Error('Failed to create order');
    }

    return savedOrder;
  }
}
