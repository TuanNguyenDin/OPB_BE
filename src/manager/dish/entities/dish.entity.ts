import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema()
export class Dish {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    price: number;
    @Prop()
    imageURL: Array<string>;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
    categoriesID: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'restaurants' })
    restaurantsID: string;

    timestamps: true;
}
export type DishDocument = HydratedDocument<Dish>;
export const DishSchema = SchemaFactory.createForClass(Dish);
