// mongoose-requirements.repository.ts

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequirementsRepositoryPort } from '../../domain/requirements/requirements.repository.port';
import { Requirements as RequirementsEntity } from '../../domain/requirements/requirements.entity';
import { CreateRequirementsDTO } from '../../application/requirements/dto/create-requirements.dto';
import { RequirementsDocument, Requirements } from './requirements.schema';

export class MongooseRequirementsRepository
  implements RequirementsRepositoryPort
{
  constructor(
    @InjectModel(Requirements.name)
    private readonly requirementsModel: Model<RequirementsDocument>,
  ) {}
  async save(requirements: RequirementsEntity): Promise<RequirementsEntity> {
    const createdRequirements = new this.requirementsModel(requirements);
    const savedRequirements = await createdRequirements.save();
    return new RequirementsEntity(
      savedRequirements.id,
      savedRequirements.eventId,
      savedRequirements.description,
      savedRequirements.quantity,
      savedRequirements.specs_json,
    );
  }
  async create(dto: CreateRequirementsDTO): Promise<RequirementsEntity> {
    const createdRequirements = new this.requirementsModel(dto);
    const savedRequirements = await createdRequirements.save();
    return new RequirementsEntity(
      savedRequirements.id,
      savedRequirements.eventId,
      savedRequirements.description,
      savedRequirements.quantity,
      savedRequirements.specs_json,
    );
  }
  async findById(id: string): Promise<RequirementsEntity | null> {
    const found = await this.requirementsModel.findById(id).exec();
    if (!found) return null;
    return new RequirementsEntity(
      found.id,
      found.eventId,
      found.description,
      found.quantity,
      found.specs_json,
    );
  }
  async findAll(): Promise<RequirementsEntity[]> {
    const found = await this.requirementsModel.find().exec();
    return found.map(
      (req) =>
        new RequirementsEntity(
          req.id,
          req.eventId,
          req.description,
          req.quantity,
          req.specs_json,
        ),
    );
  }
  async findByEventId(eventId: string): Promise<RequirementsEntity[]> {
    const found = await this.requirementsModel.find({ eventId }).exec();
    return found.map(
      (req) =>
        new RequirementsEntity(
          req.id,
          req.eventId,
          req.description,
          req.quantity,
          req.specs_json,
        ),
    );
  }
  async deleteById(id: string): Promise<void> {
    await this.requirementsModel.findByIdAndDelete(id).exec();
  }
  async update(requirements: RequirementsEntity): Promise<RequirementsEntity> {
    const updated = await this.requirementsModel
      .findByIdAndUpdate(
        requirements.id,
        {
          eventId: requirements.eventId,
          description: requirements.description,
          quantity: requirements.quantity,
          specs_json: requirements.specs_json,
        },
        { new: true },
      )
      .exec();
    if (!updated) throw new Error('Requirements not found');
    return new RequirementsEntity(
      updated.id,
      updated.eventId,
      updated.description,
      updated.quantity,
      updated.specs_json,
    );
  }

  
  async count(): Promise<number> {
    return this.requirementsModel.countDocuments().exec();
  }
}
