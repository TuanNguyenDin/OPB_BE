import { PartialType } from '@nestjs/swagger';
import { CreateComboMenuDto } from './create-combo_menu.dto';

export class UpdateComboMenuDto extends PartialType(CreateComboMenuDto) {
    name: string;
    description: string;
    image: string;
    food_package_id: string;
    service_package_id: string;
    price: number;
}
