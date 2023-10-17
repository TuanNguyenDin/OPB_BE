import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
    @ApiProperty({
        description:'Update name of restaurant'
    })
    name?: string;
    @ApiProperty({
        description:'Update email contact of restaurant'
    })
    email?: string;
    @ApiProperty({
        description:'update address of restaurant'
    })
    address?: string;
    @ApiProperty({})
    phone?: string;
    @ApiProperty({})
    website?: string;
}
