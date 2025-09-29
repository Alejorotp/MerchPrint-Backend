// roles.controller.ts

import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateRoleDTO } from '../../../application/roles/dto/create-role.dto';
import { UpdateRoleDTO } from '../../../application/roles/dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from '../../../domain/roles/role.entity';
import { CreateRoleUseCase } from 'apps/auth-service/src/application/roles/usecases/create-role.usecase';
import { GetAllRolesUseCase } from 'apps/auth-service/src/application/roles/usecases/get-all-roles.usecase';
import { DeleteRoleUseCase } from 'apps/auth-service/src/application/roles/usecases/delete-role.usecase';
import { ExistsRoleByNameUseCase, ExistsRoleByIdUseCase } from 'apps/auth-service/src/application/roles/usecases/exists-role.usecase';
import { UpdateRoleUseCase } from 'apps/auth-service/src/application/roles/usecases/update-role.usecase';
import { GetRoleUseCase } from 'apps/auth-service/src/application/roles/usecases/get-role.usecase';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(
        private readonly createRole: CreateRoleUseCase,
        private readonly getAllRoles: GetAllRolesUseCase,
        private readonly getRole: GetRoleUseCase,
        private readonly deleteRole: DeleteRoleUseCase,
        private readonly updateRole: UpdateRoleUseCase,
        private readonly existsRoleByName: ExistsRoleByNameUseCase,
        private readonly existsRoleById: ExistsRoleByIdUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'The role has been successfully created.', type: Role })
    @ApiResponse({ status: 400, description: 'Bad Request. Role name already in use.' })
    async create(@Body() body: CreateRoleDTO): Promise<Role> {
        const nameTaken = await this.existsRoleByName.execute(body.name);
        if (nameTaken) throw new Error('Role name already in use');
        return this.createRole.execute(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'Return all roles.', type: [Role] })
    async findAll(): Promise<Role[]> {
        return this.getAllRoles.execute();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a role by ID' })
    @ApiResponse({ status: 200, description: 'Role found.', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found.' })
    async findById(@Param('id') id: string): Promise<Role | null> {
        const role = await this.getRole.execute(id);
        if (!role) return null;
        return role;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a role' })
    @ApiResponse({ status: 200, description: 'The role has been successfully updated.', type: Role })
    @ApiResponse({ status: 404, description: 'Role not found.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Role name already in use.' })
    async update(@Param('id') id: string, @Body() body: UpdateRoleDTO): Promise<Role | null> {
        const roleExists = await this.existsRoleById.execute(id);
        if (!roleExists) throw new Error('Role not found');
        if (body.name) {
            const nameTaken = await this.existsRoleByName.execute(body.name);
            if (nameTaken) throw new Error('Role name already in use');
        }
        return this.updateRole.execute(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a role' })
    @ApiResponse({ status: 204, description: 'The role has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Role not found.' })
    async delete(@Param('id') id: string): Promise<void> {
        const roleExists = await this.existsRoleById.execute(id);
        if (!roleExists) throw new Error('Role not found');
        return this.deleteRole.execute(id);
    }

    @Get('exists/name/:name')
    @ApiOperation({ summary: 'Check if a role exists by name' })
    @ApiResponse({ status: 200, description: 'Returns boolean indicating if role exists.' })
    async existsByName(@Param('name') name: string): Promise<{ exists: boolean }> {
        const exists = await this.existsRoleByName.execute(name);
        return { exists };
    }

    @Get('exists/id/:id')
    @ApiOperation({ summary: 'Check if a role exists by id' })
    @ApiResponse({ status: 200, description: 'Returns boolean indicating if role exists.' })
    async existsById(@Param('id') id: string): Promise<{ exists: boolean }> {
        const exists = await this.existsRoleById.execute(id);
        return { exists };
    }
}