import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel('restaurant') private readonly restaurantModel: Model<Restaurant>) { }
  async create(data) {
    try {
      const restaurant = await new this.restaurantModel({
        name: data.name,
        phone: data.phone,
        email: data.email,
        Image: data.Image,
        manager: data.manager,
        verify: false,
      }).save();
      return await this.restaurantModel.findOne({ phone: restaurant.phone }).exec();
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.restaurantModel.find({ deactivate: false } || { deactivate: undefined }).exec();// ở đây là tìm tất cả các restaurant đang còn hoạt động hoặc không có thuộc tính deactivate
  }

  async findOne(id: string) {
    return await this.restaurantModel.findById(id).exec();
  }

  async update(id: string, data) {
    const updateRestaurantDto = await this.restaurantModel.findById(id).exec();
    if (!updateRestaurantDto) {
      throw new HttpException('Restaurant not fund!', HttpStatus.BAD_REQUEST);
    } else {
      if (data.name !== null && data.name !== undefined && data.name !== updateRestaurantDto.name) {
        updateRestaurantDto.name = data.name;
      }
      if (data.email !== null && data.email !== undefined && data.email !== updateRestaurantDto.email) {
        updateRestaurantDto.email = data.email;
      }
      if (data.address !== null && data.address !== undefined && data.address !== updateRestaurantDto.address) {
        updateRestaurantDto.address = data.address;
      }
      return await this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto).exec();
    }
  }

  async remove(id: string) {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new HttpException('Restaurant not found!', HttpStatus.BAD_REQUEST);
    }
    if (restaurant.equipment.length > 0) {
      throw new HttpException('You can not delete a restaurant that has equipment!', HttpStatus.BAD_REQUEST);
    }
    if (restaurant.categories.length > 0) {
      throw new HttpException('You can not delete a restaurant that has categories!', HttpStatus.BAD_REQUEST);
    }
    return await this.restaurantModel.findByIdAndRemove(id).exec();
  }  
  async findRestaurantByManager(manager: string) {
    return await this.restaurantModel.find({ manager: manager }).exec();
  }
}
