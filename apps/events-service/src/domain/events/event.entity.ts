// event.entity.ts
import { ApiProperty } from "@nestjs/swagger";

class Event {
    @ApiProperty()
    public  id: string
    @ApiProperty()
    public userId: string
    @ApiProperty()
    public  name: string
    @ApiProperty()
    public  date: Date
    @ApiProperty()
    public  location: string
    constructor(id: string, userId: string, name: string, date: Date, location: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.date = date;
        this.location = location;
    }
}

export  { Event };