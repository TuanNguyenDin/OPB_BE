import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFoodOrderDto } from './create-food_order.dto';

export class UpdateFoodOrderDto extends PartialType(CreateFoodOrderDto) {
    @ApiProperty({example: 1, description: 'The quantity of the order'})
    quantity: number;
    @ApiProperty({example: 1, description: 'The price of the order'})
    price: number;
    @ApiProperty({example: '1', description: 'The description of the order'})
    description: string;
}
