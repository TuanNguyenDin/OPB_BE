import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from '../order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from '../payment.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{name:'Payment', schema:paymentSchema},{name:Order.name, schema:OrderSchema}])],
  controllers: [DemoController],
  providers: [DemoService, OrderService],
})
export class DemoModule {}
