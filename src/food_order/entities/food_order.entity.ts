import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";
import { Food } from "src/food/entities/food.entity";
import { Order } from "src/order/entities/order.entity";

@Schema({timestamps: true})
export class FoodOrder {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Food'})
    food_id: Food;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    order_id: Order;
    @Prop({})
    quantity: number;
    @Prop({})
    price: number;
    @Prop({})
    description: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    created_by: Account;
}

export type FoodOrderDocument = HydratedDocument<FoodOrder>;
export const FoodOrderSchema = SchemaFactory.createForClass(FoodOrder);
