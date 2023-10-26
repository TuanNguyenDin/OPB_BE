import { HttpException, Injectable } from '@nestjs/common';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodOrder } from './entities/food_order.entity';
import { Order } from 'src/order/entities/order.entity';
import { Food } from 'src/food/entities/food.entity';

@Injectable()
export class FoodOrderService {
  constructor(
    @InjectModel('FoodOrder') private readonly foodOrderModel: Model<FoodOrder>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Food') private readonly foodModel: Model<Food>
  ) {}
  async create(createFoodOrderDto: CreateFoodOrderDto, order_id: string, food_id: string) {
    const order = await this.orderModel.findById(order_id);
    const food = await this.foodModel.findById(food_id);
    if (!order) {throw new HttpException('Order not found', 404);}
    if (!food) {throw new HttpException('Food not found', 404);}
    return await this.foodOrderModel.create(createFoodOrderDto);
  }

  async findAll() {
    return await this.foodOrderModel.find().exec();
  }

  async findOne(id: string) {
    return await this.foodOrderModel.findById(id).exec();
  }

  async update(id: string, updateFoodOrderDto: UpdateFoodOrderDto) {
    return await this.foodOrderModel.findByIdAndUpdate(id,updateFoodOrderDto,{new: true});
  }

  async remove(id: string) {
    return await this.foodOrderModel.findByIdAndRemove(id);
  }
}
