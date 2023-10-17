import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './entities/dish.entity';
import { Model } from 'mongoose';

@Injectable()
export class DishService {
  constructor(@InjectModel('Dish') private dishModel: Model<Dish>) {}
  async create(data) {
    const newDish = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      restaurant: data.restaurant,
      // availability: data.availability,
      // rating: data.rating,
      // numReviews: data.numReviews,
      // createdAt: new Date().toISOString(),
      // updatedAt: new Date().toISOString(),
    }
    return await this.dishModel.create(newDish);
  }

  async findAll() {
    return await this.dishModel.find().exec();
  }

  async findOne(id: string) {
    return await this.dishModel.findById(id).exec();
  }

  async update(id: string, data) {
    const currentEntity = await this.dishModel.findById(id).exec();
    if(!currentEntity) {throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);}
    if(currentEntity.description === 'deactivate') {throw new HttpException('This restaurant no longer activate', HttpStatus.OK);}
    if(currentEntity.name!== data.name) {currentEntity.name = data.name;}
    if(currentEntity.description!== data.description) {currentEntity.description = data.description;}
    if(currentEntity.imageURL!== data.imageURL) {currentEntity.imageURL = [...data.imageURL];}
    if(currentEntity.price!== data.price) {currentEntity.price = data.price;}
    return await this.dishModel.findByIdAndUpdate(id, currentEntity).exec();
  }

  async remove(id: string) {
    return await this.dishModel.findByIdAndUpdate(id, {description: 'deactivate'}).exec();
  }
}
