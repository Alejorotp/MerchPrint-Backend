// offer.entity.ts

export enum OfferStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export class Offer {
  constructor(
    public readonly id: string,
    public readonly auction_id: string,
    public readonly company_id: string,
    public readonly price: number,
    public readonly lead_time_days: number,
    public status: OfferStatus,
    public readonly created_at: Date = new Date(),
    public readonly specs_json: Record<string, any> = {},
  ) { }

  accept(): void {
    if (this.status !== OfferStatus.PENDING) {
      throw new Error('Only pending offers can be accepted');
    }
    this.status = OfferStatus.ACCEPTED;
  }

  reject(): void {
    if (this.status !== OfferStatus.PENDING) {
      throw new Error('Only pending offers can be rejected');
    }
    this.status = OfferStatus.REJECTED;
  }

  expire(): void {
    if (this.status === OfferStatus.PENDING) {
      this.status = OfferStatus.EXPIRED;
    }
  }

  isValid(): boolean {
    return this.status === OfferStatus.PENDING;
  }
}
