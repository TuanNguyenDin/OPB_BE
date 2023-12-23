import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Account } from "src/auth/entities/user.entities";

@Schema({timestamps: true})
export class Notify {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null})
    created_by: Account;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true})
    send_to: Account;
    @Prop({})
    title: string;
    @Prop({})
    content: string;
    @Prop({default: false})
    isRead: boolean;
}

export type NotifyDocument = HydratedDocument<Notify>;
export const NotifySchema = SchemaFactory.createForClass(Notify);
