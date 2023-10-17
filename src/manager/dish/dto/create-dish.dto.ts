import { ApiProperty } from "@nestjs/swagger";

export class CreateDishDto {
    @ApiProperty({})
    name: string;
    @ApiProperty({})
    description: string;
    @ApiProperty({})
    price: number;
    @ApiProperty({})
    imageURL: Array<string>;
    @ApiProperty({})
    categoriesID: string;
    @ApiProperty({})
    restaurantsID: string;
}
