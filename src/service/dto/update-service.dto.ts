import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
    image: string;
    name: string;
    unit: string;
    description: string;
    price: number;
    updated_by: string;
}
