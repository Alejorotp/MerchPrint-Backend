import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'offers' })
export class OfferDocument extends Document {
  @Prop({ required: true })
  auction_id: string;

  @Prop({ required: true })
  company_id: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1 })
  lead_time_days: number;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending',
  })
  status: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ type: Object, required: false })
  specs_json?: JSON;
}

export const OfferSchema = SchemaFactory.createForClass(OfferDocument);
