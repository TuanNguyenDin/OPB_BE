import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceOrderService } from './service_order.service';
import { CreateServiceOrderDto } from './dto/create-service_order.dto';
import { UpdateServiceOrderDto } from './dto/update-service_order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('service-order')
@ApiTags('Service Order')
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post()
  @ApiOperation({summary: 'Creates a service order'})
  create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrderService.create(createServiceOrderDto);
  }

  @Get()
  @ApiOperation({summary: 'Finds all service orders'})
  findAll() {
    return this.serviceOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds a service order'})
  findOne(@Param('id') id: string) {
    return this.serviceOrderService.findOne(id);
  }
  
  @Get('order/:id')
  @ApiOperation({summary: 'Finds a service order by order id'})
  findbyOrderId(@Param('id') id: string) {
    return this.serviceOrderService.findByOrderId(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates a service order'})
  update(@Param('id') id: string, @Body() updateServiceOrderDto: UpdateServiceOrderDto) {
    return this.serviceOrderService.update(id, updateServiceOrderDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletes a service order'})
  remove(@Param('id') id: string) {
    return this.serviceOrderService.remove(id);
  }
}
