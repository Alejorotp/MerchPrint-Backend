// requirements.mapper.ts

import { Requirements } from '../../../domain/requirements/requirements.entity';
import { CreateRequirementsDTO } from '../dto/create-requirements.dto';

export const toRequirementsDTO = (requirements: Requirements): any => ({
    id: requirements.id,
    eventId: requirements.eventId,
    description: requirements.description,
    quantity: requirements.quantity,
    specs_json: requirements.specs_json,
});

export const toRequirementsEntity = (dto: CreateRequirementsDTO, id: string): Requirements => {
    return new Requirements(id, dto.eventId, dto.description, dto.quantity, dto.specs_json);
}