import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateRequirementsUseCase } from '../../../application/requirements/usecases/create-requirements.usecase';
import { GetRequirementsUseCase } from '../../../application/requirements/usecases/get-requirements.usecase';
import { UpdateRequirementsUseCase } from '../../../application/requirements/usecases/update-requirements.usecase';
import { DeleteRequirementsUseCase } from '../../../application/requirements/usecases/delete-requirements.usecase';
import { CreateRequirementsDTO } from '../../../application/requirements/dto/create-requirements.dto';
import { UpdateRequirementsDTO } from '../../../application/requirements/dto/update-requirements.dto';
import { RequirementsDTO } from '../../../application/requirements/dto/requirements.dto';

@ApiTags('requirements')
@Controller('requirements')
export class RequirementsController {
  constructor(
    private readonly createRequirements: CreateRequirementsUseCase,
    private readonly getRequirements: GetRequirementsUseCase,
    private readonly updateRequirements: UpdateRequirementsUseCase,
    private readonly deleteRequirements: DeleteRequirementsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create requirements for an event' })
  @ApiBody({ type: CreateRequirementsDTO })
  @ApiResponse({ status: 201, description: 'Requirements created', type: RequirementsDTO })
  async create(@Body() body: CreateRequirementsDTO) {
    if (!body?.eventId || !body?.description || !body?.quantity || !body?.specs_json)
      throw new Error('eventId, requirements, quantity and specs_json are required');
    const requirements = await this.createRequirements.execute(body);
    return requirements;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get requirements by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Requirements found', type: RequirementsDTO })
  @ApiResponse({ status: 404, description: 'Requirements not found' })
  async getById(@Param('id') id: string) {
    const requirements = await this.getRequirements.execute(id);
    if (!requirements) throw new Error('Requirements not found');
    return requirements;
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get requirements by event ID' })
  @ApiParam({ name: 'eventId', required: true })
  @ApiResponse({ status: 200, description: 'Requirements found', type: [RequirementsDTO] })
  async getByEventId(@Param('eventId') eventId: string) {
    const requirements = await this.getRequirements.executeByEventId(eventId);
    return requirements;
  }

  @Get()
  @ApiOperation({ summary: 'Get all requirements' })
  @ApiResponse({ status: 200, description: 'List of requirements', type: [RequirementsDTO] })
  async getAll() {
    const requirements = await this.getRequirements.executeAll();
    return requirements;
  }

  @Get('count/all')
  @ApiOperation({ summary: 'Get requirements count' })
  @ApiResponse({ status: 200, description: 'Requirements count', type: Number })
  async count() {
    const count = await this.getRequirements.count();
    return { count };
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update requirements by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateRequirementsDTO })
  @ApiResponse({ status: 200, description: 'Requirements updated', type: RequirementsDTO })
  @ApiResponse({ status: 404, description: 'Requirements not found' })
  async update(@Param('id') id: string, @Body() body: UpdateRequirementsDTO) {
    if (!body?.description && !body?.quantity && !body?.specs_json)
      throw new Error('At least one field (description, quantity, specs_json) must be provided for update');
    const updatedRequirements = await this.updateRequirements.execute(id, body);
    return updatedRequirements;
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete requirements by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Requirements deleted', type: Boolean })
  async delete(@Param('id') id: string) {
    if (!id) throw new Error('Requirements id is required for deletion');
    const deleted = await this.deleteRequirements.execute(id);
    if (!deleted) throw new Error('Requirements not found or could not be deleted');
    return deleted;
  }
}