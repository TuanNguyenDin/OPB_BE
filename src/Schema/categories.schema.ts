import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { DishAndBreverages } from './dish_or_beverage.schema';

@Schema()
export class Categories{
    @Prop()
    name: string;
    @Prop()
    Description: string;
    @Prop()
    Image: string;
    @Prop({type:[DishAndBreverages]})
    DishAndBreverages: Array<DishAndBreverages>;
}