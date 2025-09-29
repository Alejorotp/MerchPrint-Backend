import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'orders' })
export class OrderDocument extends Document {
  @Prop({ required: true })
  client_id: string;

  @Prop({ required: false, default: null, type: String })
  offer_id: string;

  @Prop({
    required: true,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
