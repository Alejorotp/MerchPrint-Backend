import {Event} from './event.entity';

export interface EventRepositoryPort {
  save(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findAll(): Promise<Event[]>;
  existsByTitle(title: string): Promise<boolean>;
  findByTitle(title: string): Promise<Event | null>;
  deleteByTitle(title: string): Promise<void>;
  deleteById(id: string): Promise<void>;
  update(event: Event): Promise<Event>;
  findByUserId(userId: string): Promise<Event[]>;
  count(): Promise<number>;
}