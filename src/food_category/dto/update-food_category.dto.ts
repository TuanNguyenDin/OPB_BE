import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFoodCategoryDto } from './create-food_category.dto';

export class UpdateFoodCategoryDto extends PartialType(CreateFoodCategoryDto) {
    @ApiProperty({example: 'https://www.google.com/image.jpg', description: 'image of the food category'})
    image: string;
    @ApiProperty({example: 'food', description: 'name of the food category'})
    name: string;
    @ApiProperty({example: 'food description', description: 'description of the food category'})
    description: string;
    updated_by: string;
}
