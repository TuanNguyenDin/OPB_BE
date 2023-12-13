import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";

@Schema({timestamps: true})
export class Order {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'account'})
    customer_id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'restaurant'})
    restaurant_id: string;
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