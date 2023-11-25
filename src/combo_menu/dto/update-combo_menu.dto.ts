import { PartialType } from '@nestjs/swagger';
import { CreateComboMenuDto, CreateFoodPackageDto, CreateServicePackageDto } from './create-combo_menu.dto';

export class UpdateComboMenuDto extends PartialType(CreateComboMenuDto) {
    name: string;
    description: string;
    image: string;
    food_package_id: string;
    service_package_id: string;
    price: number;
}
export class UpdateFoodPackageDto extends PartialType(CreateFoodPackageDto) {
    name: string;
    description: string;
    image: string;

    food_items: Array<string>;
}
export class UpdateServicePackageDto extends PartialType(CreateServicePackageDto) {
    name: string;
    description: string;
    image: string;
    service_items: Array<string>;
}
