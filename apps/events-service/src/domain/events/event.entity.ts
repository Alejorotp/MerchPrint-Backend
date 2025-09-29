
export class Event { 

    constructor(
        public readonly id: string,
        public userId: string,
        public name: string,
        public date: Date,
        public location: string,
    ) {}

}