import { ApiProperty } from "@nestjs/swagger";


export class CreateComboMenuDto {
    @ApiProperty({example: 'big party', description: 'name of the combo menu'})
    name: string;
    @ApiProperty({example: 'this is  combo menu', description: 'description of the combo menu'})
    description: string;
    @ApiProperty({example:'https://image.com', description:'url of the image'})
    image: string;
    @ApiProperty({example:'1234567890', description:'id of restaurant'})
    restaurant_id: string;
    @ApiProperty({example:'1234567890', description:'id of the food package use for combo menu'})
    food_id: Array<string>;
    @ApiProperty({example:'1234567890', description:'id of the service package use for combo menu'})
    service_id: Array<string>;
    @ApiProperty({example:'50000', description:'Price of the combo menu'})
    price: number;
    @ApiProperty({example: 'John@gmail.com', description: 'User created combo menu'})
    created_by: string;
    @ApiProperty({example: 'John@gmail.com', description: 'User updated combo menu'})
    updated_by: string;
}

