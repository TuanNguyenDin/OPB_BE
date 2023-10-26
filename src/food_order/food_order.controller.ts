import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';

@Controller('food-order')
export class FoodOrderController {
  constructor(private readonly foodOrderService: FoodOrderService) { }

  @Post('order/:id/food')
  create(@Param('id') order_id: string, @Body() createFoodOrderDto: CreateFoodOrderDto, @Body() food_id: string) {
    return this.foodOrderService.create(createFoodOrderDto, order_id, food_id);
  }

  @Get()
  findAll() {
    return this.foodOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodOrderDto: UpdateFoodOrderDto) {
    return this.foodOrderService.update(id, updateFoodOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodOrderService.remove(id);
  }
}
