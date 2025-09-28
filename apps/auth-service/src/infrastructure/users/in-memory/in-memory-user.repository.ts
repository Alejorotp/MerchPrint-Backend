// in-memory-user.repository.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { User } from '../../../domain/users/user.entity';

export class InMemoryUserRepository implements UserRepositoryPort {
  private store = new Map<string, User>();
  async save(u: User) { this.store.set(u.id, u); return u; }
  async findById(id: string) { return this.store.get(id) ?? null; }
  async findAll() { return [...this.store.values()]; }
  async existsByEmail(email: string) { return [...this.store.values()].some(u => u.email === email); }
}