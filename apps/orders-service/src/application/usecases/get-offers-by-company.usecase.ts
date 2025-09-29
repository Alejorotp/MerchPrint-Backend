import { Offer } from '../../domain/entities/offer.entity';
import { OfferRepositoryPort } from '../../domain/repositories/offer.repository.port';

export class GetOffersByCompanyUseCase {
  constructor(private readonly offerRepo: OfferRepositoryPort) {}

  async execute(companyId: string): Promise<Offer[]> {
    if (!companyId || companyId.trim() === '') {
      throw new Error('Company ID is required');
    }

    return this.offerRepo.findByCompanyId(companyId);
  }
}
