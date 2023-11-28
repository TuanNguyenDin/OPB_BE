import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class FoodOrder {
    @Prop({})
    food_id: string;
    @Prop({})
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
