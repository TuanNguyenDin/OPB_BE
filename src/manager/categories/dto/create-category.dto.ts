import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        example: 'desserts',
        description: 'Name of the category'
    })
    categoryName: string;
    @ApiProperty({
        example: 'desserts',
        description: 'Description of the category'
    })
    description: string;
    @ApiProperty({
        example: 'https://blogs.ancestry.com/cm/files/2017/07/shutterstock_432054559-1.jpg',
        description: 'Image of the category'
    })
    ImageURL: Array<string>;
    @ApiProperty({
        example: '652bdc3f413784db8c06b796',
        description: 'RestaurantsID of the category'
    })
    restaurantsID: string;
}
