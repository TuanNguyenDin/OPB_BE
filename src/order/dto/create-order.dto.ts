import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({example: 1, description: 'The id of the customer'})
    customer_id: string;
    @ApiProperty({example: 1, description: 'The id of the restaurant'})
    restaurant_id: string;
    @ApiProperty({example: 1, description: 'The number of the table'})
    table_count: number;
    @ApiProperty({example: 'description', description: 'The description of the order'})
    description: string;
    @ApiProperty({example: 'handle', description: 'The status of the order'})
    status: string;
    @ApiProperty({example: 1000000, description: 'The total price of the order'})
    total_price: number;
    @ApiProperty({example: 10000, description: 'The tax of the order'})
    tax: number;
    @ApiProperty({example: 10000, description: 'The prepaid of the order'})
    prepaid: number;
    @ApiProperty({example: 100000, description: 'The extra fee of the order'})
    extra_fee: number;
    @ApiProperty({example: 1, description: 'The discount of the order'})
    discount: number;
    created_by: string;
    updated_by: string;
    @ApiProperty({example: '1/1', description: 'The date start party of the order'})
    started_at: Date;
    @ApiProperty({example: '5/1', description: 'The date end party of the order'})
    ended_at: Date;
}
