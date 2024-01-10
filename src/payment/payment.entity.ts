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
    transactionNo: string;
    @Prop({})
    created_at: Date;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_at: Date;
    @Prop({})
    updated_by: string;
}
@Schema({timestamps: true})
export class PaymentCard{
    @Prop({})
    number: string;
    @Prop({})
    holder: string;
    @Prop({})
    expiration: string;
    @Prop({})
    logo: string;
}

export type paymentDocument = HydratedDocument<payment>;
export const paymentSchema = SchemaFactory.createForClass(payment);
export type paymentCardDocument = HydratedDocument<PaymentCard>;
export const paymentCardSchema = SchemaFactory.createForClass(PaymentCard);