import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerDto } from './create-manager.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
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
}
