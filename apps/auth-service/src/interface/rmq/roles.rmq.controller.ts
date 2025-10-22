import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleUseCase } from '../../application/roles/usecases/create-role.usecase';
import { GetAllRolesUseCase } from '../../application/roles/usecases/get-all-roles.usecase';
import { GetRoleUseCase } from '../../application/roles/usecases/get-role.usecase';
import { DeleteRoleUseCase } from '../../application/roles/usecases/delete-role.usecase';
import { UpdateRoleUseCase } from '../../application/roles/usecases/update-role.usecase';
import { ExistsRoleByNameUseCase, ExistsRoleByIdUseCase } from '../../application/roles/usecases/exists-role.usecase';
import { CreateRoleDTO } from '../../application/roles/dto/create-role.dto';
import { UpdateRoleDTO } from '../../application/roles/dto/update-role.dto';

@Controller()
export class RolesRmqController {
    constructor(
        private readonly createRole: CreateRoleUseCase,
        private readonly getAllRoles: GetAllRolesUseCase,
        private readonly getRole: GetRoleUseCase,
        private readonly deleteRole: DeleteRoleUseCase,
        private readonly updateRole: UpdateRoleUseCase,
        private readonly existsRoleByName: ExistsRoleByNameUseCase,
        private readonly existsRoleById: ExistsRoleByIdUseCase,
    ) {}

    @MessagePattern('auth.roles.create')
    async create(@Payload() body: CreateRoleDTO) {
        const nameTaken = await this.existsRoleByName.execute(body.name);
        if (nameTaken) throw new Error('Role name already in use');
        return this.createRole.execute(body);
    }

    @MessagePattern('auth.roles.findAll')
    async findAll() {
        return this.getAllRoles.execute();
    }

    @MessagePattern('auth.roles.findById')
    async findById(@Payload() id: string) {
        const role = await this.getRole.execute(id);
        if (!role) return null;
        return role;
    }

    @MessagePattern('auth.roles.update')
    async update(@Payload() data: { id: string, body: UpdateRoleDTO }) {
        const roleExists = await this.existsRoleById.execute(data.id);
        if (!roleExists) throw new Error('Role not found');
        if (data.body.name) {
            const nameTaken = await this.existsRoleByName.execute(data.body.name);
            if (nameTaken) throw new Error('Role name already in use');
        }
        return this.updateRole.execute(data.id, data.body);
    }

    @MessagePattern('auth.roles.delete')
    async delete(@Payload() id: string) {
        const roleExists = await this.existsRoleById.execute(id);
        if (!roleExists) throw new Error('Role not found');
        await this.deleteRole.execute(id);
        return { message: 'Role deleted successfully' };
    }

    @MessagePattern('auth.roles.existsByName')
    async existsByName(@Payload() name: string) {
        const exists = await this.existsRoleByName.execute(name);
        return { exists };
    }

    @MessagePattern('auth.roles.existsById')
    async existsById(@Payload() id: string) {
        const exists = await this.existsRoleById.execute(id);
        return { exists };
    }
}