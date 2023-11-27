import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from '../order/order.service';

@Module({
  imports: [HttpModule],
  controllers: [DemoController],
  providers: [DemoService, OrderService],
})
export class DemoModule {}
