import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { FoodOrderModule } from './food_order/food_order.module';
import { FoodModule } from './food/food.module';
import { FoodCategoryModule } from './food_category/food_category.module';
import { ServiceOrderModule } from './service_order/service_order.module';
import { ServiceModule } from './service/service.module';
import { LocationModule } from './location/location.module';
import { AddressModule } from './address/address.module';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaymentModule } from './payment/payment.module';
import { ComboMenuModule } from './combo_menu/combo_menu.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', '.dev.env']
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'swagger-static'),
    serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/api/swagger',
  }),
  MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    RestaurantModule,
    OrderModule,
    FoodOrderModule,
    FoodModule,
    FoodCategoryModule,
    ServiceOrderModule,
    ServiceModule,
    LocationModule,
    AddressModule,
    PaymentModule,
    HttpModule,
    ComboMenuModule,
    FeedbackModule,
    NotifyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
