import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Manager } from "src/manager/entities/manager.entity";

@Schema()
export class Restaurant {
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    website: string;
    @Prop()
    Image: string;
    @Prop()
    address: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Manager'})
    manager: Manager;
    @Prop()
    categories: any[];
    @Prop()
    equipment: any[];
    @Prop({default: false})
    verify: boolean;
    
    timestamps: true;
}

export type Schema = HydratedDocument<Restaurant>;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
