import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    @ApiProperty({example:'11/12A Phương Thái', description:'Tên địa chỉ'})
    address: string;
    @ApiProperty({example:'11', description:'Số nhà'})
    ward: string;
    @ApiProperty({example:'Phương Thái', description:'Quận/Huyện'})
    district_id: string;
    @ApiProperty({example:'Hà Nội', description:'Tỉnh/Thành phố'})
    province_id: string;
}
