import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OrderModule } from './order/order.module';
import { DemoModule } from './demo/demo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchema } from './payment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'Payment', schema:paymentSchema},{name:'paymentCard', schema:paymentSchema}]),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    HttpModule,
    OrderModule,
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
