import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class Account {
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    role: string;
    @Prop({ required: true })
    status: string;
    @Prop({ required: true })
    phone_number: string;
    @Prop({ required: true })
    full_name: string;
    @Prop({ required: true })
    avatar: string;
    @Prop({ required: true })
    password: string;
}

export type AccountDocument = HydratedDocument<Account>;
export const AccountSchema = SchemaFactory.createForClass(Account);