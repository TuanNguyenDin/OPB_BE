import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
    @ApiProperty({example:'milk', description: 'name of the food'})
    name: string;
    @ApiProperty({example:'milk description', description: 'description of the food'})
    description: string;
    @ApiProperty({example:'ly', description:'unit of the food'})
    unit: string;
    @ApiProperty({example:'https://www.google.com/image.jpg', description: 'image of the food'})
    image: string;
    updated_by: string;
}
