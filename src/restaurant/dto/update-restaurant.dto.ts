import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantDto } from './create-restaurant.dto';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
    avatar: string;
    name: string;
    description: string;
    email: string;
    phone_number: string;
    status: string;
    address_id: string;
    updated_by: string;
}
