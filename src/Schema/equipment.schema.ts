import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Equipment{
    @Prop()
    name: string;
    @Prop()
    Description: string;
    @Prop()
    Type: string;
    @Prop()
    Color: string;
    @Prop()
    Material: string;
    @Prop()
    Number: number;
    @Prop()
    Price: number;
}