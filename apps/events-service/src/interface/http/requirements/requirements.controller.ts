// requirements.controller.ts
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRequirementsUseCase } from '../../../application/requirements/usecases/create-requirements.usecase';
import { toRequirementsDTO } from '../../../application/requirements/mappers/requirements.mapper';
import { GetRequirementsUseCase } from 'apps/events-service/src/application/requirements/usecases/get-requirements.usecase';

@ApiTags('requirements')
@Controller('requirements')
export class RequirementsController {
    constructor(private readonly createRequirements: CreateRequirementsUseCase, private readonly getRequirements: GetRequirementsUseCase ) {}
    @Post()
    async create(@Body() body: { eventId: string; description: string; quantity: number; specs_json: JSON }) {
        if (!body?.eventId || !body?.description || !body?.quantity || !body?.specs_json)
            throw new Error('eventId, description, quantity and specs_json are required');
        const requirements = await this.createRequirements.execute(body);
        return toRequirementsDTO(requirements);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const requirements = await this.getRequirements.execute(id);
        if (!requirements) throw new Error('Requirements not found');
        return requirements;
    }

    @Get(':eventId')
    async getByEventId(@Param('eventId') eventId: string) {
        const requirements = await this.getRequirements.executeByEventId(eventId);
        return requirements;
    }

    @Get()
    async getAll() {
        const requirements = await this.getRequirements.executeAll();
        return requirements;
    }

    @Get('count/all')
    async count() {
        const count = await this.getRequirements.count();
        return { count };
    }


}

