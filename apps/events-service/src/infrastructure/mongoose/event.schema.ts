import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  userId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
