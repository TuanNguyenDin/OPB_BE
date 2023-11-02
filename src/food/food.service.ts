import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel('Food') private readonly foodModel:Model<Food>,
  ){}
  async create(createFoodDto: CreateFoodDto) {
    return await this.foodModel.create(createFoodDto);
  }

  async findAll() {
    return await this.foodModel.find().exec();
  }

  async findOne(id: string) {
    return await this.foodModel.findById(id);
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    return await this.foodModel.findByIdAndUpdate(id, updateFoodDto);
  }

  async findByCategory(condition:string) {
    return await this.foodModel.find({category_id: condition}).exec();
  }
  async remove(id: string) {
    return await this.foodModel.findByIdAndDelete(id);
  }
}
