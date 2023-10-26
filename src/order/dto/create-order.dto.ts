export class CreateOrderDto {
    customer_id: string;
    restaurant_id: string;
    table_count: string;
    description: string;
    status: string;
    total_price: number;
    tax: number;
    prepaid: number;
    extra_fee: number;
    discount: number;
    created_by: string;
    updated_by: string;
    started_at: Date;
    ended_at: Date;
}
