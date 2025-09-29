// in-memory-user.repository.ts

import { UserRepositoryPort } from '../../../domain/users/user.repository.port';
import { User } from '../../../domain/users/user.entity';

export class InMemoryUserRepository implements UserRepositoryPort {
  private store = new Map<string, User>();
  async save(u: User) {
    if (!u.id) throw new Error('User id is required');
    this.store.set(u.id, u);
    return u;
  }
  async findById(id: string) { return this.store.get(id) ?? null; }
  async findAll() { return [...this.store.values()]; }
  async existsByEmail(email: string) { return [...this.store.values()].some(u => u.email === email); }
  async existsById(id: string) { return this.store.has(id); }
  async deleteById(id: string) { this.store.delete(id); }
  async update(user: User) {
    if (!user.id) throw new Error('User id is required');
    if (!this.store.has(user.id)) throw new Error('User not found');
    this.store.set(user.id, user);
    return user;
  }
}