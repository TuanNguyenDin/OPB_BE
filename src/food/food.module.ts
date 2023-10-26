import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './entities/food.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:'Food', schema:FoodSchema}])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
