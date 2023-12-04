import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Account } from "src/auth/entities/user.entities";

@Schema({timestamps: true})
export class Restaurant {
    @Prop({})
    avatar: string;
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    email: string;
    @Prop({})
    phone_number: string;
    @Prop({})
    status: string;
    @Prop({})
    address_id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'account'})
    created_by: Account;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'account'})
    updated_by: Account;
}
export type RestaurantDocument = mongoose.HydratedDocument<Restaurant>;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
