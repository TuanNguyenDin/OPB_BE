import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";
import { Order } from "src/order/entities/order.entity";
import { Service } from "src/service/entities/service.entity";

@Schema({timestamps: true})
export class ServiceOrder {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Service'})
    service_id: Service;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
    order_id: Order;
    @Prop({})
    quantity: number;
    @Prop({})
    price: number;
    @Prop({})
    description: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    created_by: Account;
}
export type serviceOrderDocuments = HydratedDocument<ServiceOrder>
export const serviceOrderSchema = SchemaFactory.createForClass(ServiceOrder)
