import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceOrderDto {
    @ApiProperty({ example: '1' ,description: 'Service Id'})
    service_id: string;
    @ApiProperty({ example: '1' ,description: 'Order Id'})
    order_id: string;
    @ApiProperty({ example: '1' ,description: 'number of items'})
    quantity: number;
    @ApiProperty({ example: '1' ,description: 'price of items'})
    price: number;
    @ApiProperty({ example: 'more Information' ,description: 'description'})
    description: string;
    @ApiProperty({example: '123456', description: 'The id of the who created this order'})
    created_by: string;
}
