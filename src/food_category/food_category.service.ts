import { Injectable } from '@nestjs/common';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodCategory } from './entities/food_category.entity';

@Injectable()
export class FoodCategoryService {
  constructor(@InjectModel('FoodCategory') private readonly foodCategoryModel:Model<FoodCategory>) {}
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
    return await this.foodCategoryModel.findByIdAndDelete(id);
  }
}
