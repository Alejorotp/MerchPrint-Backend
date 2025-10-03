// auction.entity.ts

import { ApiProperty } from "@nestjs/swagger";

export class Auction {
  // Define properties as needed, for example:

  @ApiProperty({ description: 'Unique identifier for the auction' })
  id: string;

  @ApiProperty({ description: 'Identifier for the associated event' })
  event_id: string;

  @ApiProperty({ description: 'Current state of the auction' })
  status: string;

  @ApiProperty({ description: 'Start time of the auction' })
  start_at: Date;

  @ApiProperty({ description: 'End time of the auction' })
  end_at: Date;

  @ApiProperty({ description: 'Identifier for the associated company if required', required: false })
  company_id?: string;

  @ApiProperty({ description: 'Suggested price bfor the auction' })
  suggested_price: number;


  constructor( id: string, event_id: string, status: string, start_at: Date, end_at: Date, suggested_price: number, company_id?: string) {
    this.id = id;
    this.event_id = event_id;
    this.status = status;
    this.start_at = start_at;
    this.end_at = end_at;
    this.suggested_price = suggested_price;
    this.company_id = company_id;
  }
  
}

