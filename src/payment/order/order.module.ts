import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
