import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Customer{
    @Prop()
    @IsNotEmpty()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @Prop()
    @IsNotEmpty()
    password: string;
}

export type CustomerDocument = HydratedDocument<Customer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);