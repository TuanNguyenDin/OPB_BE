import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDishDto extends PartialType(CreateDishDto) {
    @ApiProperty({})
    name?: string;
    @ApiProperty({})
    description?: string;
    @ApiProperty({})
    imageURL?: string[];
    @ApiProperty({})
    price?: number;
}
