import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {
    @ApiProperty({ example:'image.png', description: 'The image of the service' })
    image: string;
    @ApiProperty({ example:'service name', description: 'The name of the service' })
    name: string;
    @ApiProperty({ example:'service unit', description: 'The unit of the service' })
    unit: string;
    @ApiProperty({ example:'service description', description: 'The description of the service' })
    description: string;
    @ApiProperty({ example:'500000', description: 'The price of the service' })
    price: number;
    created_by: string;
    updated_by: string;
    @ApiProperty({ example:'1', description: 'The restaurant id of the service' })
    restaurant_id: string;
}
