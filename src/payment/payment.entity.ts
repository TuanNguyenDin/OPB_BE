import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class payment{
    @Prop({})
    amount: number;
    @Prop({})
    order_id: string;
    @Prop({})
    method : string;
    @Prop({})
    content: string;
    @Prop({})
    status: string;
    @Prop({})
    reference_transaction_id: string;
    @Prop({})
    created_at: Date;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_at: Date;
    @Prop({})
    updated_by: string;
}

export type paymentDocument = HydratedDocument<payment>;
export const paymentSchema = SchemaFactory.createForClass(payment);