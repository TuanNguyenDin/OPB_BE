import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { VNPAYService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', '.dev.env']
  }), HttpModule],
  controllers: [PaymentController],
  providers: [VNPAYService],
})
export class PaymentModule { }
