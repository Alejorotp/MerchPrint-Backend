// in-memory-event.repository.ts

import { EventRepositoryPort } from '../../domain/events/event.repository.port';
import { Event } from '../../domain/events/event.entity';



export class InMemoryEventRepository implements EventRepositoryPort {
  private store = new Map<string, Event>();
    async save(e: Event) { this.store.set(e.id, e); return e; }
    async findById(id: string) { return this.store.get(id) ?? null; }
    async findAll() { return [...this.store.values()]; }
    async existsByTitle(title: string) { return [...this.store.values()].some(e => e.name === title); }
    async deleteByTitle(title: string) {
        const event = [...this.store.values()].find(e => e.name === title);
        if (event) this.store.delete(event.id);
    }
    async update(event: Event) {
        if (!this.store.has(event.id)) throw new Error('Event not found');
        this.store.set(event.id, event);
        return event;
    }
    async findByDate(date: Date) {
        return [...this.store.values()].filter(e => e.date.toDateString() === date.toDateString());
    }
    async findByLocation(location: string) {
        return [...this.store.values()].filter(e => e.location === location);
    }
    async findByUserId(UserId: string) {
        return [...this.store.values()].filter(e => e.userId === UserId);
    }
    async deleteById(id: string) { this.store.delete(id); }
    async findByTitle(title: string) {
        return [...this.store.values()].find(e => e.name === title) || null;
    }

    async count() { return this.store.size; }
}
