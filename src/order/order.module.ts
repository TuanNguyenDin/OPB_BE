import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { AuthModule } from 'src/auth/auth.module';
import { Account, AccountSchema } from 'src/auth/entities/user.entities';
import { RestaurantSchema } from 'src/restaurant/entities/restaurant.entity';
import { NotifySchema } from 'src/notify/entities/notify.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:Order.name, schema:OrderSchema},{name:Account.name, schema:AccountSchema},{name:'Restaurant', schema:RestaurantSchema},{ name: 'Notify', schema: NotifySchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
