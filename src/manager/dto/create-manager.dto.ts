import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "src/auth/dto/create-user.dto";

export class CreateManagerDto implements CreateUserDto{
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
        default: 'manager',
        description: 'Position of the user on system, default: manager'
    })
    position: string;
    @ApiProperty({
        default: new Date(),
        description: 'Date strat to work of the user on system, default: today'
    })
    dateStart: Date;
    @ApiProperty({
        example: '<PASSWORD>',
        description: 'Password of the user'
    })
    password: string;
    @ApiProperty({default: false})
    isAdmin: boolean;
}
