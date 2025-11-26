import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class GetOrderByOfferIdUseCase {
    constructor(private readonly orderRepo: OrderRepositoryPort) { }

    async execute(offerId: string): Promise<Order | null> {
        return this.orderRepo.findByOfferId(offerId);
    }
}
