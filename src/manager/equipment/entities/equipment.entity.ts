import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema()
export class Equipment {
    @Prop()
    equipmentName: string;
    @Prop()
    description: string;
    @Prop()
    ImageURL: Array<string>;
    @Prop()
    price: number;
    @Prop()
    quantity: number;
    @Prop()
    category: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'restaurants' })
    restaurant: string;

    timestamps: true;
}

export type EquipmentDocument = HydratedDocument<Equipment>;
export const EquipmentSchema = SchemaFactory.createForClass(Equipment);
