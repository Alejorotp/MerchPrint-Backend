// user.mapper.ts

import { User } from '../../../domain/users/user.entity';
import { UserDTO } from '../dto/user.dto';

export const toUserDTO = (user: User): UserDTO => new UserDTO(
    user.id ?? '',
    user.email,
    user.name,
    user.roleId,
);