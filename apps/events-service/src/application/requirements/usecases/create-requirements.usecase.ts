//create-requirements.usecase.ts

import { randomUUID } from 'crypto';
import { CreateRequirementsDTO } from '../dto/create-requirements.dto';
import { Requirements } from '../../../domain/requirements/requirements.entity';
import { RequirementsRepositoryPort } from '../../../domain/requirements/requirements.repository.port';
import { RequirementsDTO } from '../dto/requirements.dto';
import { toRequirementsDTO } from '../mappers/requirements.mapper';

export class CreateRequirementsUseCase {
  constructor(private readonly requirementsRepo: RequirementsRepositoryPort) {}
  async execute(input: CreateRequirementsDTO): Promise<RequirementsDTO> {
    const eventExists = await this.requirementsRepo.eventExists(input.eventId);
    if (!eventExists) throw new Error('Event not found');
    const requirements = new Requirements(
      randomUUID(),
      input.eventId,
      input.description,
      input.quantity,
      input.specs_json,
    );
    const savedRequirements = await this.requirementsRepo.save(requirements);
    return toRequirementsDTO(savedRequirements);
  }
}
