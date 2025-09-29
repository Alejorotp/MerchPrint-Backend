import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';

export class InMemoryOrderRepository implements OrderRepositoryPort {
    private orders: Order[] = [];
    private nextId = 1;

    async save(order: Order): Promise<Order> {
        const existingIndex = this.orders.findIndex((o) => o.id === order.id);
        if (existingIndex >= 0) {
            this.orders[existingIndex] = order;
        } else {
            this.orders.push(order);
        }
        return order;
    }

    async findById(id: string): Promise<Order | null> {
        return this.orders.find((order) => order.id === id) || null;
    }

    async findAll(): Promise<Order[]> {
        return [...this.orders];
    }

    async findByClientId(clientId: string): Promise<Order[]> {
        return this.orders.filter((order) => order.client_id === clientId);
    }

    async findByStatus(status: OrderStatus): Promise<Order[]> {
        return this.orders.filter((order) => order.status === status);
    }

    async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
        const orderIndex = this.orders.findIndex((order) => order.id === id);
        if (orderIndex === -1) {
            return null;
        }

        const existingOrder = this.orders[orderIndex];
        const updatedOrder = new Order(
            existingOrder.id,
            existingOrder.client_id,
            orderData.offer_id !== undefined ? orderData.offer_id : existingOrder.offer_id,
            orderData.status !== undefined ? orderData.status : existingOrder.status,
            existingOrder.created_at,
            new Date(),
        );

        this.orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.orders.length;
        this.orders = this.orders.filter((order) => order.id !== id);
        return this.orders.length < initialLength;
    }

    // Method for testing - clear all data
    clear(): void {
        this.orders = [];
    }
}
