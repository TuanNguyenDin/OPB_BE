import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food_category.service';
import { FoodCategoryController } from './food_category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodCategorySchema } from './entities/food_category.entity';
import { FoodSchema } from 'src/food/entities/food.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'FoodCategory', schema: FoodCategorySchema}, {name:'Food', schema:FoodSchema}])],
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
})
export class FoodCategoryModule {}
