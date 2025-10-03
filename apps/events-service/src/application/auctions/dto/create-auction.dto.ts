// create-auction.dto.ts


import { ApiProperty } from "@nestjs/swagger";

export class CreateAuctionDTO {
    @ApiProperty({ description: 'Identifier for the associated event' })
    event_id: string;

    @ApiProperty({ description: 'Start time of the auction' })
    start_at: Date;

    @ApiProperty({ description: 'End time of the auction' })
    end_at: Date;

    @ApiProperty({ description: 'Suggested price for the auction' })
    suggested_price: number;

    @ApiProperty({ description: 'Identifier for the associated company if required', required: false })
    company_id?: string;

    
    constructor(event_id: string, start_at: Date, end_at: Date, suggested_price: number, company_id?: string) {
        this.event_id = event_id;
        this.start_at = start_at;
        this.end_at = end_at;
        this.suggested_price = suggested_price;
        this.company_id = company_id;
    }
}