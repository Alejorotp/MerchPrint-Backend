// update-requirements.usecase.ts

import { toRequirementsDTO } from '../mappers/requirements.mapper';
import { RequirementsDTO } from '../dto/requirements.dto';
import { UpdateRequirementsDTO } from '../dto/update-requirements.dto';
import { RequirementsRepositoryPort } from '../../../domain/requirements/requirements.repository.port';

export class UpdateRequirementsUseCase {
    constructor(private readonly requirementsRepo: RequirementsRepositoryPort ) {}
    async execute(id: string, dto: UpdateRequirementsDTO): Promise<RequirementsDTO> {
        const existing = await this.requirementsRepo.findById(id);
        if (!existing) throw new Error('Requirements not found');
        existing.description = dto.description ?? existing.description;
        existing.quantity = dto.quantity ?? existing.quantity;
        existing.specs_json = dto.specs_json ?? existing.specs_json;
        const updated = await this.requirementsRepo.update(existing);
        return toRequirementsDTO(updated);
    }
}
