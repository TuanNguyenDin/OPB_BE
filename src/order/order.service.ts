import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { Account } from 'src/auth/entities/user.entities';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Account') private readonly accountModel: Model<Account>, 
    @InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>
  ) {}
  async create(createOrderDto: CreateOrderDto, useID:string, restaurantID:string) {
    const creator = await this.accountModel.findById(useID);
    const restaurant = await this.restaurantModel.findById(restaurantID);
    if (!creator) {throw new HttpException('User not found', 404);}
    if (creator.role !== 'customer') {throw new HttpException('User not authorized', 403);}
    if (!restaurant) {throw new HttpException('Restaurant not found', 404);}
    createOrderDto.customer_id = useID;
    createOrderDto.restaurant_id = restaurantID;
    createOrderDto.created_by = useID;
    return await this.orderModel.create(createOrderDto);
  }

  async findAll() {
    return await this.orderModel.find().exec();
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, useID: string) {
    const creator = await this.accountModel.findById(useID);
    if (!creator) {throw new HttpException('User not found', 404);}
    updateOrderDto.updated_by = useID;
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async findByCreatedAt(createdAt: Date) {
    return await this.orderModel.find({ createdAt: { $gte: createdAt } }).exec();
  }
}
