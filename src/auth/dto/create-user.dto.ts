import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    @ApiProperty({example: 'John@gmail.com', description: 'email of the user'})
    email: string;
    @ApiProperty({example: 'manager', description: 'role of the user'})  
    role: string;
    @ApiProperty({example:'verified', description:'status of the user'})
    status: string;
    @ApiProperty({example:'1234567890', description: 'phone number of the user'})
    phone_number: string;
    @ApiProperty({example:'John', description: 'full name of the user'})
    full_name: string;
    @ApiProperty({example:'https://www.google.com/image.jpg', description: 'avatar of the user'})
    avatar: string;
    @ApiProperty({example:'<PASSWORD>', description: 'password of the user'})
    password: string;
}