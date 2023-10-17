import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Restaurant } from "src/manager/restaurant/entities/restaurant.entity";

@Schema()
export class Category {
    @Prop()
    categoryName: string;
    @Prop()
    description: string;
    @Prop()
    ImageURL: Array<string>;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'restaurants'})
    restaurantsID: Restaurant;

    timestamps: true;
}
export type CategoriesDocument = HydratedDocument<Category>;
export const CategoriesSchema = SchemaFactory.createForClass(Category);
