import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('account/:id/restaurant/:res_id')
  @ApiOperation({ summary: 'Creates a order' })
  create(
    @Param('id') id: string,
    @Param('res_id') res_id: string,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.orderService.create(createOrderDto, id, res_id);
  }

  @Get()
  @ApiOperation({ summary: 'Finds all orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a order' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('account/:account_id/order/:id')
  @ApiOperation({ summary: 'Updates a order' })
  update(@Param('id') id: string,@Param('account_id') use_id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto, use_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Get('report/:date')
  @ApiTags('Report')
  @ApiOperation({ summary: 'Get report by date, return all orders form a date to now' })
  getReport(@Param('date') createdAt: string) {
    return this.orderService.findByCreatedAt(new Date(createdAt));
  }
}
