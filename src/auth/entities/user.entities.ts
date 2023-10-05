import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop({default: false})
    isAdmin: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);