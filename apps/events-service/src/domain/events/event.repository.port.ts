import {Event} from './event.entity';

export interface EventRepositoryPort {
  save(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
  existsByTitle(title: string): Promise<boolean>;
  deleteByTitle(title: string): Promise<void>;
  update(event: Event): Promise<Event>;
  findByDate(date: Date): Promise<Event[]>;
  findByLocation(location: string): Promise<Event[]>;
  findByUserId(userId: string): Promise<Event[]>;
  count(): Promise<number>;
}