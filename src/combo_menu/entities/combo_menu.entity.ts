import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class ComboMenu {
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    image: string;
    @Prop({})
    restaurant_id: string;
    @Prop({})
    food_package_id: string;
    @Prop({})
    service_package_id: string;
    @Prop({})
    price: number;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
}
@Schema({ timestamps: true })
export class FoodPackage {
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    image: string;
    @Prop({})
    restaurant_id: string;
    @Prop({})
    food_items: Array<string>;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
}
@Schema({ timestamps: true })
export class ServicePackage {
    @Prop({})
    name: string;
    @Prop({})
    description: string;
    @Prop({})
    image: string;
    @Prop({})
    restaurant_id: string;
    @Prop({})
    service_items: Array<string>;
    @Prop({})
    created_by: string;
    @Prop({})
    updated_by: string;
}
export type ComboMenuDocument = HydratedDocument<ComboMenu>;
export type FoodPackageDocument = HydratedDocument<FoodPackage>;
export type ServicePackageDocument = HydratedDocument<ServicePackage>;
export const ComboMenuSchema = SchemaFactory.createForClass(ComboMenu);
export const FoodPackageSchema = SchemaFactory.createForClass(FoodPackage);
export const ServicePackageSchema = SchemaFactory.createForClass(ServicePackage);