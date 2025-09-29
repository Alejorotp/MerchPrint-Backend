// requirements.entity.ts

export class Requirements {
    constructor(
        public readonly id: string,
        public eventId: string,
        public description: string,
        public quantity: string,
        public specs_json: JSON
    ) {}
}