// role.mapper.ts

import { Role } from '../../../domain/roles/role.entity';
import { RoleDTO } from '../dto/role.dto';

export const toRoleDTO = (role: Role): RoleDTO  => ({
    id: role.id ?? '',
    name: role.name,
    permissions: role.permissions,
});