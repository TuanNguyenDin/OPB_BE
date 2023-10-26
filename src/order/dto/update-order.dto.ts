import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    table_count: string;
    description: string;
    status: string;
    total_price: number;
    tax: number;
    prepaid: number;
    extra_fee: number;
    discount: number;
    updated_by: string;
}
