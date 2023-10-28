import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto {
    @ApiProperty({example:'milk', description: 'name of the food'})
    name: string;
    @ApiProperty({example:'milk description', description: 'description of the food'})
    description: string;
    @ApiProperty({example:'ly', description:'unit of the food'})
    unit: string;
    @ApiProperty({example:'https://www.google.com/image.jpg', description: 'image of the food'})
    image: string;
    @ApiProperty({example:'milk', description: 'category of the food'})
    category_id: string;
    @ApiProperty({example:'Jhon', description: 'User who create this food'})
    created_by: string;
    @ApiProperty({example:'Jhon', description: 'User who update this food'})
    updated_by: string;
}
