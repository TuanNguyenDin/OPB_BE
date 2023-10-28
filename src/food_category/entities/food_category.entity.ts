import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class FoodCategory {
    @Prop({})
    image: string;
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;

    timestamps: true;
}
export type FoodCategoryDocument = HydratedDocument<FoodCategory>;
export const FoodCategorySchema = SchemaFactory.createForClass(FoodCategory);
