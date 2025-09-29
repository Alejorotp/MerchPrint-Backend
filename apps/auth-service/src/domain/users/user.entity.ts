// user.entity.ts

export class User { 

    constructor(
        public readonly id: string,
        public readonly email: string,
        public name: string,
        public password_hash: string,
        public readonly roleId: string,
    ) {}

}