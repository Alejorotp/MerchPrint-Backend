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
    @Prop({ type: Number, required: true })
    quantity: number;
    @Prop({ type: Object, required: true })
    specs_json: JSON;
}

export const RequirementsSchema = SchemaFactory.createForClass(Requirements);
