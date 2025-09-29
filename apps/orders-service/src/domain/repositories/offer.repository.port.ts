import { Offer, OfferStatus } from '../entities/offer.entity';

export interface OfferRepositoryPort {
  save(offer: Offer): Promise<Offer>;
  findById(id: string): Promise<Offer | null>;
  findAll(): Promise<Offer[]>;
  findByAuctionId(auctionId: string): Promise<Offer[]>;
  findByCompanyId(companyId: string): Promise<Offer[]>;
  findByStatus(status: OfferStatus): Promise<Offer[]>;
  update(id: string, offer: Partial<Offer>): Promise<Offer | null>;
  delete(id: string): Promise<boolean>;
}
