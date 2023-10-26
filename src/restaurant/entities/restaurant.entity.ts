import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Restaurant {
    @Prop({})
    avatar: string;
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    email: string;
    @Prop({})
    phone_number: string;
    @Prop({})
    status: string;
    @Prop({})
    address_id: string;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;

    timestamps: true
}
export type RestaurantDocument = HydratedDocument<Restaurant>;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
