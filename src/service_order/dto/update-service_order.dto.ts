import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceOrderDto } from './create-service_order.dto';

export class UpdateServiceOrderDto extends PartialType(CreateServiceOrderDto) {
    @ApiProperty({ example: '1' ,description: 'number of items'})
    quantity: number;
    @ApiProperty({ example: '1' ,description: 'price of items'})
    price: number;
    @ApiProperty({ example: 'more Information' ,description: 'description'})
    description: string;
}
