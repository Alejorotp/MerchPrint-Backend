// user.entity.ts

export class User { 

    constructor(
        public readonly id: string,
        public email: string,
        public name: string,
        public password_hash: string,
        public readonly role: string,
    ) {}

}