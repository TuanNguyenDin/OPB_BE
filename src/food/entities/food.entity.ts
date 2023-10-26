import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Food {
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    unit: string;
    @Prop({})
    image: string;
    @Prop({})
    category_id: string;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;

    timestamps: true
}

export type FoodDocument = HydratedDocument<Food>;
export const FoodSchema = SchemaFactory.createForClass(Food);
