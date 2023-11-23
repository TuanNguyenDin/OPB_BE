import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodCategory } from './entities/food_category.entity';
import { Food } from 'src/food/entities/food.entity';

@Injectable()
export class FoodCategoryService {
  constructor(
    @InjectModel('FoodCategory') private readonly foodCategoryModel:Model<FoodCategory>,
    @InjectModel('Food') private readonly foodModel:Model<Food>) {}
  async create(createFoodCategoryDto: CreateFoodCategoryDto) {
    return await this.foodCategoryModel.create(createFoodCategoryDto);
  }

  async findAll() {
    return await this.foodCategoryModel.find();
  }

  async findOne(id: string) {
    return await this.foodCategoryModel.findById(id);
  }

  async update(id: string, updateFoodCategoryDto: UpdateFoodCategoryDto) {
    return await this.foodCategoryModel.findByIdAndUpdate(id, updateFoodCategoryDto);
  }

  async remove(id: string) {
    const hasDependentFoods = await this.foodModel.find({category_id: id}).countDocuments() > 0;

    if(hasDependentFoods){
      throw new HttpException("There are still food items belonging to this category. Please delete them first.", HttpStatus.BAD_REQUEST);
    }

    return await this.foodCategoryModel.findByIdAndDelete(id);
  }
}
