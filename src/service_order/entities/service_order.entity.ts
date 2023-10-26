import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class ServiceOrder {
    @Prop({})
    service_id: string;
    @Prop({})
    order_id: string;
    @Prop({})
    quantity: number;
    @Prop({})
    price: number;
    @Prop({})
    description: string;

    timestamp: true;
}
export type serviceOrderDocuments = HydratedDocument<ServiceOrder>
export const serviceOrderSchema = SchemaFactory.createForClass(ServiceOrder)
