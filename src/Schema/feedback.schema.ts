import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Feedback{
    @Prop()
    Description: string;
    @Prop()
    Status: string;
    @Prop()
    Reply: string;
    @Prop()
    Rating: string;
}