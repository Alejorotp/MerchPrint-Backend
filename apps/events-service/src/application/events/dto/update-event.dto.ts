// update-event.dto.ts
import { ApiProperty } from "@nestjs/swagger";
class UpdateEventDTO {
    @ApiProperty()
    public userId?: string
    @ApiProperty()
    public  name?: string
    @ApiProperty()
    public  date?: Date
    @ApiProperty()
    public  location?: string
    constructor(name?: string, date?: Date, location?: string) {
        this.name = name;
        this.date = date;
        this.location = location;
    }
}
export { UpdateEventDTO };