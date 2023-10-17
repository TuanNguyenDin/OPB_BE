import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: 'John',
        description: 'Name of the user'
    })
    name: string;
    @ApiProperty({
        example: '0909090909',
        description: 'Phone number of the user'
    })
    phone: string;
    @ApiProperty({
        example: '<EMAIL>',
        description: 'Email of the user'
    })
    email: string;
    @ApiProperty({
        example: '<PASSWORD>',
        description: 'Password of the user'
    })
    password: string;
    @ApiProperty({default: false})
    isAdmin: boolean;
}