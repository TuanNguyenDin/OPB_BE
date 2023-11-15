import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class Account {
    @Prop({})
    email: string;
    @Prop({})
    role: string;
    @Prop({})
    status: string;
    @Prop({})
    phone_number: string;
    @Prop({})
    full_name: string;
    @Prop({})
    avatar: string;
    @Prop({})
    password: string;
}

export type AccountDocument = HydratedDocument<Account>;
export const AccountSchema = SchemaFactory.createForClass(Account);
