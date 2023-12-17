import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Food } from "src/food/entities/food.entity";
import { Service } from "src/service/entities/service.entity";

@Schema({ timestamps: true })
export class ComboMenu {
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    image: string;
    @Prop({})
    restaurant_id: string;
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}])
    food_id:Array<Food>;
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref:'Service'}])
    service_id: Array<Service>;
    @Prop({})
    price: number;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
}
export type ComboMenuDocument = HydratedDocument<ComboMenu>;
export const ComboMenuSchema = SchemaFactory.createForClass(ComboMenu);