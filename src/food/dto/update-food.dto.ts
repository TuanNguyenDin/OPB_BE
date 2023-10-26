import { PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
    name: string;
    description: string;
    unit: string;
    image: string;
    category_id: string;
    updated_by: string;
}
