import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event as EventEntity } from '../../domain/events/event.entity';
import { EventRepositoryPort } from '../../domain/events/event.repository.port';
import { Event, EventDocument } from './event.schema';

@Injectable()
export class MongooseEventRepository implements EventRepositoryPort {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}
    async save(event: EventEntity): Promise<EventEntity> {
    const createdEvent = new this.eventModel(event);
    const saved = await createdEvent.save();
    return new EventEntity(saved.id, saved.userId, saved.name, saved.date, saved.location);
  }
    async findById(id: string): Promise<EventEntity | null> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      return null;
    }
    return new EventEntity(event.id, event.userId, event.name, event.date, event.location);
    }
    async findAll(): Promise<EventEntity[]> {
    const events = await this.eventModel.find().exec();
    return events.map(event => new EventEntity(event.id, event.userId, event.name, event.date, event.location));
    }
    async existsByTitle(title: string): Promise<boolean> {
    const count = await this.eventModel.countDocuments({ name: title }).exec();
    return count > 0;
    }
    async deleteByTitle(title: string): Promise<void> {
    await this.eventModel.deleteOne({ name: title }).exec();
    }
    async update(event: EventEntity): Promise<EventEntity> {
    const updated = await this.eventModel.findByIdAndUpdate(event.id, event, { new: true }).exec();
    if (!updated) {
      throw new Error('Event not found');
    }
    return new EventEntity(updated.id, updated.userId, updated.name, updated.date, updated.location);
    }
    async findByDate(date: Date): Promise<EventEntity[]> {
    const events = await this.eventModel.find({ date }).exec();
    return events.map(event => new EventEntity(event.id, event.userId, event.name, event.date, event.location));
    }
    async findByLocation(location: string): Promise<EventEntity[]> {
    const events = await this.eventModel.find({ location }).exec();
    return events.map(event => new EventEntity(event.id, event.userId, event.name, event.date, event.location));
    }
    async findByUserId(userId: string): Promise<EventEntity[]> {
    const events = await this.eventModel.find({ userId: userId }).exec();
    return events.map(event => new EventEntity(event.id, event.userId, event.name, event.date, event.location));
    }
    async count(): Promise<number> {
    return this.eventModel.countDocuments().exec();
    }
}