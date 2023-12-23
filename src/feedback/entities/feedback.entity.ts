import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";
import { Order } from "src/order/entities/order.entity";

@Schema({timestamps: true})
export class Feedback {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Order', unique: true})
    orderId: Order;
    @Prop({})
    rating: number;
    @Prop({})
    comment: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account'})
    userId: Account;
}

export type FeedbackDocument = HydratedDocument<Feedback>;
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
