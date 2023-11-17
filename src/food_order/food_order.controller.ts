import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('food-order')
@ApiTags('Food Order')
export class FoodOrderController {
  constructor(private readonly foodOrderService: FoodOrderService) { }

  @Post('order/:id')
  @ApiOperation({ summary: 'Creates a food order' })
  create(@Param('id') order_id: string, @Body() createFoodOrderDto: CreateFoodOrderDto, @Param() food_id: string) {
    return this.foodOrderService.create(createFoodOrderDto, order_id, food_id);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all food orders' })
  findAll() {
    return this.foodOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a food order' })
  findOne(@Param('id') id: string) {
    return this.foodOrderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a food order' })
  update(@Param('id') id: string, @Body() updateFoodOrderDto: UpdateFoodOrderDto) {
    return this.foodOrderService.update(id, updateFoodOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a food order' })
  remove(@Param('id') id: string) {
    return this.foodOrderService.remove(id);
  }
}
