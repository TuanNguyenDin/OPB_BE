import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodCategoryService } from './food_category.service';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('food-category')
@ApiTags('Category')
export class FoodCategoryController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {}

  @Post()
  @ApiOperation({summary: 'Creates a category'})
  create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    return this.foodCategoryService.create(createFoodCategoryDto);
  }

  @Get()
  @ApiOperation({summary: 'Finds all categories'})
  findAll() {
    return this.foodCategoryService.findAll();
  }
  @Get('restaurant/:id')
  @ApiOperation({summary: 'Finds by restaurant categories'})
  findByRestaurant(@Param('id') id: string) {
    return this.foodCategoryService.findbyRestaurant(id);
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds a category'})
  findOne(@Param('id') id: string) {
    return this.foodCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates a category'})
  update(@Param('id') id: string, @Body() updateFoodCategoryDto: UpdateFoodCategoryDto) {
    return this.foodCategoryService.update(id, updateFoodCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletes a category'})
  remove(@Param('id') id: string) {
    return this.foodCategoryService.remove(id);
  }
}
