// role.entity.ts

export class Role {
    constructor(
        public id: string,
        public name: string,
        public permissions: string[],
    ) {}
}