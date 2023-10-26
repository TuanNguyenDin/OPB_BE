import { Module } from '@nestjs/common';
import { ServiceOrderService } from './service_order.service';
import { ServiceOrderController } from './service_order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { serviceOrderSchema } from './entities/service_order.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ServiceOrder', schema: serviceOrderSchema }, { name: Order.name, schema: OrderSchema }]),],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService],
})
export class ServiceOrderModule { }
