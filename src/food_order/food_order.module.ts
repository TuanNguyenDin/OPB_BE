import { Module } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { FoodOrderController } from './food_order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodOrderSchema } from './entities/food_order.entity';
import { FoodSchema } from 'src/food/entities/food.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'FoodOrder', schema: FoodOrderSchema},{name:'Food', schema:FoodSchema},{name:Order.name, schema:OrderSchema}])],
  controllers: [FoodOrderController],
  providers: [FoodOrderService],
})
export class FoodOrderModule {}
