import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class Service {
    @Prop({})
    image: string;
    @Prop({})
    name: string;
    @Prop({})
    unit: string;
    @Prop({})
    description: string;
    @Prop({})
    resstaurant_id: string;
    @Prop({})
    price: number;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
}

export type ServiceDocument = HydratedDocument<Service>
export const ServiceSchema = SchemaFactory.createForClass(Service)
