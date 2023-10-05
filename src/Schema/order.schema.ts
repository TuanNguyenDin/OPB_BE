import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Order{
    @Prop()
    address: string;
    @Prop()
    rules: string;
    @Prop()
    numberStaff : string;
    @Prop()
    depositDate: string;
    @Prop()
    date: Date;
    @Prop()
    time: TimeRanges;
}