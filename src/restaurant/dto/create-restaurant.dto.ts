import { ApiProperty } from "@nestjs/swagger";

export class CreateRestaurantDto {
    @ApiProperty({example:'https://www.google.com/image.jpg', description: 'avatar of the reataurant'})
    avatar: string;
    @ApiProperty({example:'Nha hang A', description: 'name of the reataurant'})
    name: string;
    @ApiProperty({example:'More information', description: 'description of the reataurant'})
    description: string;
    @ApiProperty({example:'<EMAIL>', description: 'email of the reataurant'})
    email: string;
    @ApiProperty({example:'1234567890', description: 'phone number of the reataurant'})
    phone_number: string;
    @ApiProperty({example:'verified', description:'status of the reataurant'})
    status: string;
    @ApiProperty({example:'1234567890', description: 'address of the reataurant'})
    address_id: string;
    @ApiProperty({example:'John', description: 'user who created the reataurant'})
    created_by: string;
    @ApiProperty({example:'John', description: 'user who updateed the reataurant'})
    updated_by: string;
}
