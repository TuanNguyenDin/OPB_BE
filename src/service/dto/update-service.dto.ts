import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
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
    updated_by: string;
}
