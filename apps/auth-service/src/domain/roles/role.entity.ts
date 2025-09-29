// role.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class Role {
    @ApiProperty()
    public id?: string | null;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public permissions: string[];

    constructor(name: string, permissions: string[], id?: string) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
}