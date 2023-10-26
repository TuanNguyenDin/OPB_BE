import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post('account/:id/restaurant')
  create(@Param('id') id: string,
    @Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(id, createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch('account/:account_id/restaurant/:id')
  update(@Param('id') id: string,@Param('account_id') UseId: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(UseId, id, updateRestaurantDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.restaurantService.remove(id);
  // }
}
