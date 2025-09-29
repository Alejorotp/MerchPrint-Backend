// requirements.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRequirementsUseCase } from '../../../application/events/usecases/create-requirements.usecase';
import { toRequirementsDTO } from '../../../application/events/mappers/requirements.mapper';

@ApiTags('requirements')
@Controller('requirements')
export class RequirementsController {
    constructor(private readonly createRequirements: CreateRequirementsUseCase) {}
    @Post()
    async create(@Body() body: { eventId: string; description: string; quantity: string; specs_json: JSON }) {
        if (!body?.eventId || !body?.description || !body?.quantity || !body?.specs_json)
            throw new Error('eventId, description, quantity and specs_json are required');
        const requirements = await this.createRequirements.execute(body);
        return toRequirementsDTO(requirements);
    }
}