import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './entities/service.entity';
import { Account, AccountSchema } from 'src/auth/entities/user.entities';
import { RestaurantSchema } from 'src/restaurant/entities/restaurant.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Service',schema:ServiceSchema},{name:'Restaurant', schema:RestaurantSchema},{name:Account.name, schema:AccountSchema}])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
