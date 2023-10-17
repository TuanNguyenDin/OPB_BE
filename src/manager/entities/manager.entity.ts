import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/auth/entities/user.entities";

@Schema()
export class Manager implements User {
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    position: string;
    @Prop()
    dateStart: Date;
    @Prop()
    password: string;
    @Prop({default: false})
    isAdmin: boolean;

    timestamps: true;
}

export type managerDocument = HydratedDocument<Manager>;
export const ManagerSchema = SchemaFactory.createForClass(Manager);