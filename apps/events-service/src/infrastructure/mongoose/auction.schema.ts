import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AuctionDocument = HydratedDocument<Auction>;

@Schema()
export class Auction {
  @ApiProperty({ description: 'Unique identifier for the auction' })
  @Prop({ required: true, unique: true })
  id: string;

  @ApiProperty({ description: 'Identifier for the associated event' })
  @Prop({ required: true })
  event_id: string;

  @ApiProperty({ description: 'Current state of the auction' })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ description: 'Start time of the auction' })
  @Prop({ required: true })
  start_at: Date;

  @ApiProperty({ description: 'End time of the auction' })
  @Prop({ required: true })
  end_at: Date;

  @ApiProperty({ description: 'Suggested price for the auction' })
  @Prop({ required: true })
  suggested_price: number;

  @ApiProperty({ description: 'Identifier for the associated company if required', required: false })
  @Prop()
  company_id?: string;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);