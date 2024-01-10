import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from '../payment.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [HttpModule,MongooseModule.forFeature([{name:'Payment', schema:paymentSchema},{name:Order.name, schema:OrderSchema}])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderVNPAYModule {}
