import { Offer, OfferStatus } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class InMemoryOfferRepository implements OfferRepositoryPort {
  private offers: Offer[] = [];

  async save(offer: Offer): Promise<Offer> {
    const existingIndex = this.offers.findIndex((o) => o.id === offer.id);
    if (existingIndex >= 0) {
      this.offers[existingIndex] = offer;
    } else {
      this.offers.push(offer);
    }
    return offer;
  }

  async findById(id: string): Promise<Offer | null> {
    return this.offers.find((offer) => offer.id === id) || null;
  }

  async findAll(): Promise<Offer[]> {
    return [...this.offers];
  }

  async findByAuctionId(auctionId: string): Promise<Offer[]> {
    return this.offers.filter((offer) => offer.auction_id === auctionId);
  }

  async findByCompanyId(companyId: string): Promise<Offer[]> {
    return this.offers.filter((offer) => offer.company_id === companyId);
  }

  async findByStatus(status: OfferStatus): Promise<Offer[]> {
    return this.offers.filter((offer) => offer.status === status);
  }

  async update(id: string, offerData: Partial<Offer>): Promise<Offer | null> {
    const offerIndex = this.offers.findIndex((offer) => offer.id === id);
    if (offerIndex === -1) {
      return null;
    }

    const existingOffer = this.offers[offerIndex];
    const updatedOffer = new Offer(
      existingOffer.id,
      existingOffer.auction_id,
      existingOffer.company_id,
      offerData.price !== undefined ? offerData.price : existingOffer.price,
      existingOffer.lead_time_days, // lead_time_days cannot be updated
      offerData.status !== undefined ? offerData.status : existingOffer.status,
      existingOffer.created_at,
      existingOffer.specs_json,
    );

    this.offers[offerIndex] = updatedOffer;
    return updatedOffer;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.offers.length;
    this.offers = this.offers.filter((offer) => offer.id !== id);
    return this.offers.length < initialLength;
  }

  // Method for testing - clear all data
  clear(): void {
    this.offers = [];
  }
}
