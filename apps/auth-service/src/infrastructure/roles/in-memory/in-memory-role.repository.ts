// in-memory-role.repository.ts

import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';
import { Role } from '../../../domain/roles/role.entity';

export class InMemoryRoleRepository implements RoleRepositoryPort {
  private store = new Map<string, Role>();
  async save(r: Role) {
    if (!r.id) throw new Error('Role id is required');
    this.store.set(r.id, r);
    return r;
  }
  async findById(id: string) { return this.store.get(id) ?? null; }
  async findAll() { return [...this.store.values()]; }
  async existsByName(name: string) { return [...this.store.values()].some(r => r.name === name); }
  async delete(id: string) { this.store.delete(id); }
  async update(id: string, update: Partial<Role>) {
    const role = this.store.get(id);
    if (!role) return null;
    const updatedRole = { ...role, ...update };
    this.store.set(id, updatedRole);
    return updatedRole;
  }
  async existsById(id: string) { return this.store.has(id); }
}