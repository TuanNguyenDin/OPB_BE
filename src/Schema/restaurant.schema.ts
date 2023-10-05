import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { RestaurantManager } from './restaurant_manager.schema';
import { Categories } from './categories.schema';
import { Equipment } from './equipment.schema';

@Schema()
export class Restaurant{
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    website: string;
    @Prop()
    Image: string;

    @Prop({type: RestaurantManager})
    manager: RestaurantManager;

    @Prop({type:[Categories]})
    categories: Array<Categories>;

    @Prop({type:[Equipment]})
    equipment: Array<Equipment>;
}