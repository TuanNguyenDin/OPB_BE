import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Order } from './order.schema';
import { Feedback } from './Feedback.schema';

@Schema()
export class Customer{
    @Prop()
    name: string;
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    
    @Prop({type: [Order]})
    order: Array<Order>;

    @Prop({type: [Feedback]})
    feedback: Array<Feedback>;
}