import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodCategoryDto {
    @ApiProperty({example: 'https://www.google.com/image.jpg', description: 'image of the food category'})
    image: string;
    @ApiProperty({example: 'food', description: 'name of the food category'})
    name: string;
    @ApiProperty({example: 'food description', description: 'description of the food category'})
    description: string;
    @ApiProperty({example: 'Jhon', description: 'User who create this food category'})
    created_by: string;
    @ApiProperty({example: 'Jhon', description: 'User who update this food category'})
    updated_by: string;
}
