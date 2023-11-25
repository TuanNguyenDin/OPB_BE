import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';


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
    food_package_id: string;
    @ApiProperty({example:'1234567890', description:'id of the service package use for combo menu'})
    service_package_id: string;
    @ApiProperty({example:'50000', description:'Price of the combo menu'})
    price: number;
    @ApiProperty({example: 'John@gmail.com', description: 'User created combo menu'})
    created_by: string;
    @ApiProperty({example: 'John@gmail.com', description: 'User updated combo menu'})
    updated_by: string;
}
export class CreateFoodPackageDto {
    @ApiProperty({example: 'big party', description: 'name of the food package'})
    name: string;
    @ApiProperty({example: 'food package description', description: 'food package description'})
    description: string;
    @ApiProperty({example: 'http://image', description: 'url of the image'})
    image: string;
    @ApiProperty({example: '1234567890', description: 'id of restaurant'})
    restaurant_id: string;
    @ApiProperty({example: '1234567890', description: 'id of the food package use for combo menu'})
    food_items: Array<string>;
    @ApiProperty({example: '1234567890', description: 'User created food package'})
    created_by: string;
    @ApiProperty({example: '1234567890', description: 'User updated food package'})
    updated_by: string;
}
export class CreateServicePackageDto {
    @ApiProperty({example: 'big party', description: 'name of the service package'})
    name: string;
    @ApiProperty({example: 'description', description: 'description of the service package'})
    description: string;
    @ApiProperty({example: 'http://image', description: 'url of the image'})
    image: string;
    @ApiProperty({example: '1234567890', description: 'restaurant id'})
    restaurant_id: string;
    @ApiProperty({example: '1234567890', description: 'id of the service package use for combo menu'})
    service_items: Array<string>;
    @ApiProperty({example: '1234567890', description: 'User created service package'})
    created_by: string;
    @ApiProperty({example: '1234567890', description: 'User updated service package'})
    updated_by: string;
}
export class CreatePackageDto {
    @ApiProperty({ type: String, enum: ['combo', 'food', 'service'] })
    modelType: 'combo' | 'food' | 'service';
  
    @Type(() => CreateComboMenuDto)
    @Type(() => CreateFoodPackageDto)
    @Type(() => CreateServicePackageDto)
     // Bạn có thể thêm các loại khác nếu cần
    @ApiProperty()
    data: CreateComboMenuDto | CreateFoodPackageDto | CreateServicePackageDto;
  }
