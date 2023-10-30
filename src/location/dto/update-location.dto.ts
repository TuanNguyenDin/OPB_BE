import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
    address: string;
    ward: string;
    district_id: string;
    province_id: string;
}
