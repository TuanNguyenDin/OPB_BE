import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
    @ApiProperty({
        example: 'Kabin',
        description: 'Create a new restaurant'
    })
    name: string;
    @ApiProperty({
        example: '0987654321',
        description:'Phone to contact the restaurant'
    })
    phone: string;
    @ApiProperty({
        example: '<EMAIL>',
        description: 'Email of the restaurant'
    })
    email: string;
    @ApiProperty({
        example:'http://example.com',
        description:'website of the restaurant'
    })
    website: string;
    @ApiProperty({
        example: 'https://blogs.ancestry.com/cm/files/2017/07/shutterstock_432054559-1.jpg',
        description: 'Image of the restaurant'
    })
    Image: Array<string>;
    @ApiProperty({
        example:'652bdc3f413784db8c06b796',
        description:'manager ID of restaurant'
    })
    manager: any;
    @ApiProperty({
        example:'9/distric 9/ HCM city',
        description: 'Address of restaurant'
    })
    address: string;
    @ApiProperty({
        example:'652bdc3f413784db8c06b796',
        description:'List categories of restaurant'
    })
    categories: any[];
    @ApiProperty({
        example:'652bdc3f413784db8c06b796',
        description:'List equipments of restaurant'
    })
    equipment: any[];
    @ApiProperty({
        description:'Property show restaurant verified or not'
    })
    verify: boolean;
}
