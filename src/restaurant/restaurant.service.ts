import { HttpException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './entities/restaurant.entity';
import { Account } from 'src/auth/entities/user.entities';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel('Restaurant') private restaurantModel: Model<Restaurant>,
  @InjectModel('Account') private readonly userModel: Model<Account>,
  ) {}
  async create(id: string, createRestaurantDto: CreateRestaurantDto) {
    const creator = await this.userModel.findById(id);
    if (!creator) {throw new HttpException('User not found', 404);}
    if (creator.role === 'customer') {throw new HttpException('User not authorized', 403);}
    return await this.restaurantModel.create(createRestaurantDto);
  }

  async findAll() {
    return await this.restaurantModel.find().exec();
  }

  async findOne(id: number) {
    return  await this.restaurantModel.findById(id).exec();
  }

  async update(UseId: string, id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const creator = await this.userModel.findById(UseId);
    if (!creator) {throw new HttpException('User not found', 404);}
    if (creator.role === 'customer') {throw new HttpException('User not authorized', 403);}
    return await this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto, { new: true });
  }

  async remove(id: string) {
    return await this.restaurantModel.findByIdAndDelete(id);
  }
}
