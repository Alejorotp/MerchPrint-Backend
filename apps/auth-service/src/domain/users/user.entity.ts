// user.entity.ts

import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty()
    public readonly id?: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public password_hash: string;

    @ApiProperty()
    public readonly roleId: string;

    constructor(email: string, name: string, password_hash: string, roleId: string, id?: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password_hash = password_hash;
        this.roleId = roleId;
    }
}