import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class FoodOrder {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'foods'})
    food_id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'orders'})
    order_id: string;
    @Prop({})
    quantity: number;
    @Prop({})
    price: number;
    @Prop({})
    description: string;
}

export type FoodOrderDocument = HydratedDocument<FoodOrder>;
export const FoodOrderSchema = SchemaFactory.createForClass(FoodOrder);
