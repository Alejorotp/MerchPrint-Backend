// requirements.entity.ts
import { ApiProperty } from "@nestjs/swagger";

export class Requirements {
    @ApiProperty()
    public readonly id?: string;
    @ApiProperty()
    public eventId: string
    @ApiProperty()
    public description: string
    @ApiProperty()
    public quantity: number
    @ApiProperty()
    public specs_json: JSON
    constructor(eventId: string, description: string, quantity: number, specs_json: JSON, id?: string) {
        this.id = id;
        this.eventId = eventId;
        this.description = description;
        this.quantity = quantity;
        this.specs_json = specs_json;
    }
}