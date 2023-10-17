import { ApiProperty } from "@nestjs/swagger";

export class CreateEquipmentDto {
    @ApiProperty({
        example: 'candle',
        description:'Name of equipment service'
    })
    equipmentName: string;
    @ApiProperty({
        example:'candle',
        description:'type of equipment'
    })
    type: string;
    @ApiProperty({
        example:'shining',
        description: 'description of equipment'
    })
    description: string;
    @ApiProperty({
        example:'200',
        description:'price of description'
    })
    price: number;
    @ApiProperty({
        description: 'List imaga of this equipment'
    })
    ImageURL: Array<String>
}
