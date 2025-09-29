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
    public readonly offer_id: string,
    public status: OrderStatus,
    public readonly created_at: Date = new Date(),
    public updated_at: Date = new Date(),
  ) {}

  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
    this.updated_at = new Date();
  }
}
