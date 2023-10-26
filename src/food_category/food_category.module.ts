import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food_category.service';
import { FoodCategoryController } from './food_category.controller';

@Module({
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
})
export class FoodCategoryModule {}
