import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({
        example: 'desserts',
        description: 'Update category name'
    })
    categoryName?: string;
    @ApiProperty({
        example: 'desserts',
        description: 'update category description'
    })
    description?: string;
    @ApiProperty({
        example: 'https://blogs.ancestry.com/cm/files/2017/07/shutterstock_432054559-1.jpg',
        description: 'update category image list'
    })
    ImageURL?: string[];
}
