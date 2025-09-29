// mongoose-role.repository.ts

import { Model } from 'mongoose';
import { Role } from '../../../domain/roles/role.entity';
import { RoleRepositoryPort } from '../../../domain/roles/role.repository.port';
import { RoleDocument } from './role.schema';
import { InjectModel } from '@nestjs/mongoose';

export class MongooseRoleRepository implements RoleRepositoryPort {
    constructor(@InjectModel('Role') private roleModel: Model<RoleDocument>) {}

    async save(role: Role): Promise<Role> {
        const createdRole = new this.roleModel(role);
        const savedRole = await createdRole.save();
        return new Role(savedRole.name, savedRole.permissions, savedRole.id);
    }

    async findById(id: string): Promise<Role | null> {
        const role = await this.roleModel.findById(id).exec();
        if (!role) return null;
        return new Role(role.name, role.permissions, role.id);
    }

    async findAll(): Promise<Role[]> {
        const roles = await this.roleModel.find().exec();
        return roles.map(role => new Role(role.name, role.permissions, role.id));
    }

    async delete(id: string): Promise<void> {
        await this.roleModel.findByIdAndDelete(id).exec();
    }

    async existsByName(name: string): Promise<boolean> {
        const count = await this.roleModel.countDocuments({ name }).exec();
        return count > 0;
    }

    async existsById(id: string): Promise<boolean> {
        const count = await this.roleModel.countDocuments({ _id: id }).exec();
        return count > 0;
    }

    async update(id: string, update: Partial<Role>): Promise<Role | null> {
        const updatedRole = await this.roleModel.findByIdAndUpdate(id, update, { new: true }).exec();
        if (!updatedRole) return null;
        return new Role(updatedRole.name, updatedRole.permissions, updatedRole.id);
    }
}