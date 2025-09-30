// create-requirements.dto.ts

import { ApiProperty } from "@nestjs/swagger";

class CreateRequirementsDTO {
    @ApiProperty()
    public eventId: string
    @ApiProperty()
    public description: string
    @ApiProperty()
    public quantity: number
    @ApiProperty()
    public specs_json: JSON
    constructor(eventId: string, description: string, quantity: number, specs_json: JSON) {
        this.eventId = eventId;
        this.description = description;
        this.quantity = quantity;
        this.specs_json = specs_json;
    }
}

export { CreateRequirementsDTO };