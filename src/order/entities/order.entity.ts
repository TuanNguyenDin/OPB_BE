import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

@Schema({timestamps: true})
export class Order {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    customer_id: Account;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant_id: Restaurant;
    @Prop({})
    table_count: string;
    @Prop({})
    description: string;
    @Prop({})
    status: string;
    @Prop({})
    total_price: number;
    @Prop({})
    tax: number;
    @Prop({})
    prepaid: number;
    @Prop({})
    extra_fee: number;
    @Prop({})
    discount: number;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
    @Prop({})
    started_at: Date;
    @Prop({})
    ended_at: Date;
}
export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);