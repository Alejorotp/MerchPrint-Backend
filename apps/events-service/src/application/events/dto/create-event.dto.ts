// create-event.dto.ts


import { ApiProperty } from "@nestjs/swagger";

class CreateEventDTO {
    @ApiProperty()
    public readonly userId: string;
    @ApiProperty()
    public readonly name: string;
    @ApiProperty()
    public readonly date: Date;
    @ApiProperty()
    public readonly location: string;

    constructor(userId: string, title: string, date: Date, location: string) {
        this.userId = userId;
        this.name = title;
        this.date = date;
        this.location = location;
    }
}

export  { CreateEventDTO };