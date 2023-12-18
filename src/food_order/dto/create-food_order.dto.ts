import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodOrderDto {
    @ApiProperty({example: '1', description: 'The id of the food'})
    food_id: string;
    @ApiProperty({example: '1', description: 'The id of the order'})
    order_id: string;
    @ApiProperty({example: 1, description: 'The quantity of the order'})
    quantity: number;
    @ApiProperty({example: 1, description: 'The price of the order'})
    price: number;
    @ApiProperty({example: '1', description: 'The description of the order'})
    description: string;
    @ApiProperty({example: '123456', description: 'The id of the who created this order'})
    created_by: string;
}
