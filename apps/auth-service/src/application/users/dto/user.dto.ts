// user.dto.ts

import { IsNotEmpty } from 'class-validator';

export class UserDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    roleId: string;
}