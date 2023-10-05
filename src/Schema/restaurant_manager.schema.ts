import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Schema()
export class RestaurantManager{
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    position: string;
    @Prop()
    dateStart: Date;
    @Prop()
    password: string;
    
    @Prop({ type: Restaurant})
    restaurants: Restaurant;
}