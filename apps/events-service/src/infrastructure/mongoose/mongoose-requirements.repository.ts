// mongoose-requirements.repository.ts

import { Model } from 'mongoose';
import { RequirementsRepositoryPort } from '../../domain/requirements/requirements.repository.port';
import { Requirements } from '../../domain/requirements/requirements.entity';
import { CreateRequirementsDTO } from '../../application/events/dto/create-requirements.dto';
import { toRequirementsEntity } from '../../application/events/mappers/requirements.mapper';
import { RequirementsDocument } from './requirements.schema';

export class MongooseRequirementsRepository implements RequirementsRepositoryPort {
    constructor(private readonly requirementsModel: Model<RequirementsDocument>) {}
    async save(requirements: Requirements): Promise<Requirements> {
        const created = new this.requirementsModel(requirements);
        const saved = await created.save();
        return toRequirementsEntity(saved.toObject(), saved.id.toString());
    }
    async create(dto: CreateRequirementsDTO): Promise<Requirements> {
        const newRequirements = toRequirementsEntity(dto, '');
        const created = new this.requirementsModel(newRequirements);
        const saved = await created.save();
        return toRequirementsEntity(saved.toObject(), saved.id.toString());
    }
    async findById(id: string): Promise<Requirements | null> {
        const req = await this.requirementsModel.findById(id).exec();
        if (!req) return null;
        return toRequirementsEntity(req.toObject(), req.id.toString());
    }
    async findAll(): Promise<Requirements[]> {
        const reqs = await this.requirementsModel.find().exec();
        return reqs.map(r => toRequirementsEntity(r.toObject(), r.id.toString()));
    }
    async findByEventId(eventId: string): Promise<Requirements[]> {
        const reqs = await this.requirementsModel.find({ eventId }).exec();
        return reqs.map(r => toRequirementsEntity(r.toObject(), r.id.toString()));
    }
    async deleteById(id: string): Promise<void> {
        await this.requirementsModel.findByIdAndDelete(id).exec();
        return;
    }
    async update(requirements: Requirements): Promise<Requirements> {
        const updated = await this.requirementsModel.findByIdAndUpdate(requirements.id, requirements, { new: true }).exec();
        if (!updated) throw new Error('Requirements not found');
        return toRequirementsEntity(updated.toObject(), updated.id.toString());
    }
    async count(): Promise<number> {
        return this.requirementsModel.countDocuments().exec();
    }
}