import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './entities/restaurant.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Account, AccountSchema } from 'src/auth/entities/user.entities';

@Module({
  imports: [MongooseModule.forFeature([{name:'Restaurant', schema:RestaurantSchema},{name:Account.name, schema:AccountSchema}])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
