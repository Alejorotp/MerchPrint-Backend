import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRequirementsUseCase } from '../../application/requirements/usecases/create-requirements.usecase';
import { GetRequirementsUseCase } from '../../application/requirements/usecases/get-requirements.usecase';
import { UpdateRequirementsUseCase } from '../../application/requirements/usecases/update-requirements.usecase';
import { DeleteRequirementsUseCase } from '../../application/requirements/usecases/delete-requirements.usecase';
import { toRequirementsDTO } from '../../application/requirements/mappers/requirements.mapper';
import { CreateRequirementsDTO } from '../../application/requirements/dto/create-requirements.dto';
import { UpdateRequirementsDTO } from '../../application/requirements/dto/update-requirements.dto';

@Controller()
export class RequirementsRmqController {
  constructor(
    private readonly createRequirements: CreateRequirementsUseCase,
    private readonly getRequirements: GetRequirementsUseCase,
    private readonly updateRequirements: UpdateRequirementsUseCase,
    private readonly deleteRequirements: DeleteRequirementsUseCase,
  ) {}

  @MessagePattern('requirements.create')
  async create(@Payload() data: CreateRequirementsDTO) {
    const requirements = await this.createRequirements.execute(data);
    return toRequirementsDTO(requirements);
  }

  @MessagePattern('requirements.getByEventId')
  async getByEventId(@Payload() eventId: string) {
    const requirements = await this.getRequirements.executeByEventId(eventId);  // Busca por eventId
    return requirements;  // Retorna array mapeado
  }

  @MessagePattern('requirements.update')
  async update(@Payload() data: { id: string; body: UpdateRequirementsDTO }) {
    const requirements = await this.updateRequirements.execute(data.id, data.body);
    if (!requirements) return null;
    return toRequirementsDTO(requirements);
  }

  @MessagePattern('requirements.delete')
  async delete(@Payload() id: string) {
    await this.deleteRequirements.execute(id);
    return { message: 'Requirements deleted successfully' };
  }
}