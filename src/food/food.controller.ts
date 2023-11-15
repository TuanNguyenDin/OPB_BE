import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('food')
@ApiTags('Food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @ApiOperation({summary: 'Creates a food'})
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  @ApiOperation({summary: 'Finds all foods'})
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds a food'})
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates a food'})
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletes a food'})
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }
  @Get('/find/:id')
  @ApiOperation({summary: 'Finds a food by category'})
  findByCategory(@Param('id') condition:string) {
    return this.foodService.findByCategory(condition);
  }
}
