import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class AcceptOfferUseCase {
  constructor(
    private readonly orderRepo: OrderRepositoryPort,
    private readonly offerRepo: OfferRepositoryPort,
  ) { }

  async execute(orderId: string, offerId: string): Promise<Order> {
    // Find the order
    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Validate order can accept offers
    if (order.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can accept offers');
    }

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

    // Assign offer to order
    order.assignOffer(offerId);

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

    return this.orderRepo.update(orderId, order).then((updatedOrder) => {
      if (!updatedOrder) {
        throw new Error('Failed to update order');
      }
      return updatedOrder;
    });
  }
}
