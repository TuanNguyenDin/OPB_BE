import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DishAndBreverages{
    @Prop()
    name: string;
    @Prop()
    Description: string;
    @Prop()
    Image: string;
    @Prop()
    Price: number;
}