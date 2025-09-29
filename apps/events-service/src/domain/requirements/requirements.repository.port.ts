// requirements.repository.port.ts

import { Requirements } from "./requirements.entity";
import { CreateRequirementsDTO } from "../../application/requirements/dto/create-requirements.dto";

export interface RequirementsRepositoryPort {
    save(requirements: Requirements): Promise<Requirements>;
    create(dto: CreateRequirementsDTO): Promise<Requirements>;
    findById(id: string): Promise<Requirements | null>;
    findAll(): Promise<Requirements[]>;
    findByEventId(eventId: string): Promise<Requirements[]>;
    deleteById(id: string): Promise<void>;
    update(requirements: Requirements): Promise<Requirements>;
    eventExists(eventId: string): Promise<boolean>;
    count(): Promise<number>;
}   