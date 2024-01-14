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
  ) { }
  async create(createFoodOrderDto: CreateFoodOrderDto,) {
    const exsitOrderFood = await this.foodOrderModel.findOne({ food_id: createFoodOrderDto.food_id, order_id: null, created_by:createFoodOrderDto.created_by }).exec();
    const food = await this.foodModel.findById(createFoodOrderDto.food_id);
    if (!food) { throw new HttpException('Food not found', 404); }
    
    if (exsitOrderFood===null) {
      return await this.foodOrderModel.create(createFoodOrderDto);
    } else {
      return exsitOrderFood;
    }
  }

  async findAll() {
    return await this.foodOrderModel.find().populate('food_id').populate('order_id').exec();
  }

  async findOne(id: string) {
    return await this.foodOrderModel.findById(id).populate('food_id').populate('order_id').exec();
  }

  async findByOrderId(id: string) {
    return await this.foodOrderModel.find({ order_id: id }).populate('food_id').populate('order_id').exec();
  }

  async update(id: string, updateFoodOrderDto: UpdateFoodOrderDto) {
    return await this.foodOrderModel.findByIdAndUpdate(id, updateFoodOrderDto, { new: true });
  }

  async remove(id: string) {
    return await this.foodOrderModel.findByIdAndRemove(id);
  }
}
