import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../domain/repositories/order.repository';
import { OrderDocument } from './order.schema';

@Injectable()
export class MongooseOrderRepository implements OrderRepositoryPort {
  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderModel: Model<OrderDocument>,
  ) { }

  private toDomain(orderDoc: OrderDocument): Order {
    return new Order(
      orderDoc.id,
      orderDoc.client_id,
      orderDoc.offer_id,
      orderDoc.status as OrderStatus,
      orderDoc.created_at,
      orderDoc.updated_at,
    );
  }

  async findById(id: string): Promise<Order | null> {
    const orderDoc = await this.orderModel.findById(id).exec();
    return orderDoc ? this.toDomain(orderDoc) : null;
  }

  async findAll(): Promise<Order[]> {
    const orderDocs = await this.orderModel.find().exec();
    return orderDocs.map((doc) => this.toDomain(doc));
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    const orderDocs = await this.orderModel
      .find({ client_id: clientId })
      .exec();
    return orderDocs.map((doc) => this.toDomain(doc));
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const orderDocs = await this.orderModel.find({ status }).exec();
    return orderDocs.map((doc) => this.toDomain(doc));
  }

  async save(order: Order): Promise<Order> {
    const newOrder = new this.orderModel({
      client_id: order.client_id,
      offer_id: order.offer_id,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
    const savedOrder = await newOrder.save();
    return this.toDomain(savedOrder);
  }

  async update(id: string, orderData: Partial<Order>): Promise<Order | null> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          ...orderData,
          updated_at: new Date(),
        },
        { new: true },
      )
      .exec();
    return updatedOrder ? this.toDomain(updatedOrder) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.orderModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
