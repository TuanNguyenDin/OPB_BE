import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
    @ApiProperty({example:'123', description:'Order Id'})
    orderId: string;
    @ApiProperty({example:'123', description:'title'})
    title: string;
    @ApiProperty({example:'1', description:'Rating'})
    rating: number;
    @ApiProperty({example:'Good', description:'Comment'})
    comment: string;
    @ApiProperty({example:'123', description:'User Id'})
    userId: string;
}
