// requirements.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Event } from './event.schema';


export type RequirementsDocument = HydratedDocument<Requirements>;

@Schema()
export class Requirements extends Document {
    @Prop({ type: String, required: true })
    eventId: string;
    @Prop({ type: String, required: true })
    description: string;
    @Prop({ type: String, required: true })
    quantity: string;
    @Prop({ type: Object, required: true })
    specs_json: JSON;
    @Prop({ type: String, ref: Event.name, required: true })
    event: Event;
}

export const RequirementsSchema = SchemaFactory.createForClass(Requirements);
