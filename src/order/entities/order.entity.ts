import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Order {
    @Prop({})
    customer_id: string;
    @Prop({})
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

    timestamps: true
}
export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);