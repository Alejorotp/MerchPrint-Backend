export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class Order {
  constructor(
    public readonly id: string,
    public readonly client_id: string,
    public offer_id: string | null,
    public status: OrderStatus,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) { }

  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
    this.updated_at = new Date();
  }

  assignOffer(offerId: string): void {
    if (this.offer_id) {
      throw new Error('Order already has an assigned offer');
    }
    (this as any).offer_id = offerId;
    this.status = OrderStatus.IN_PROGRESS;
    this.updated_at = new Date();
  }
}
