import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('restaurant')
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post('account/:id')
  @ApiOperation({summary: 'Creates a restaurant'})
  create(@Param('id') id: string,
    @Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(id, createRestaurantDto);
  }

  @Get()
  @ApiOperation({summary: 'Finds all restaurants'})
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds a restaurant'})
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch('account/:account_id/:id')
  @ApiOperation({summary: 'Updates a restaurant'})
  update(@Param('id') id: string,@Param('account_id') UseId: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(UseId, id, updateRestaurantDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.restaurantService.remove(id);
  // }
}
