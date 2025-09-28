// user.mapper.ts

import { User } from '../../../domain/users/user.entity';
import { UserDTO } from '../dto/user.dto';

export const toUserDTO = (user: User): UserDTO  => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
});