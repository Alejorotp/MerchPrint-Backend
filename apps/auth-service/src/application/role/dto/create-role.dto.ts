// create-role.dto.ts

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString({ each: true })
    permissions: string[];
};