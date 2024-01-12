import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { Account } from 'src/auth/entities/user.entities';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Notify } from 'src/notify/entities/notify.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Account') private readonly accountModel: Model<Account>, 
    @InjectModel('Restaurant') private readonly restaurantModel: Model<Restaurant>,
    @InjectModel('Notify') private readonly NotifyModel: Model<Notify>
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
    return await this.orderModel.find().populate('customer_id').populate('restaurant_id').exec();
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id).populate('customer_id').populate('restaurant_id').exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, useID: string) {
    const creator = await this.accountModel.findById(useID);
    
    if (!creator) {throw new HttpException('User not found', 404);}
    updateOrderDto.updated_by = useID;

    if (updateOrderDto.status === 'canceled') {
      const order = await this.orderModel.findById(id);
      if (!order) {throw new HttpException('Order not found', 404);}
      if(order.created_by !== useID) {throw new HttpException('User not authentication', 403);}

      const notify = await this.NotifyModel.create({
        title: 'Order canceled',
        content: `Order ${order._id} has been canceled`,
        send_to: order.customer_id,
        created_by: useID,
        isRead: false
      });
      if (!notify) {throw new HttpException('Notify not found', 404);}
    }

    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async findByCreatedAt(createdAt: Date) {
    const orders= await this.orderModel.find({ createdAt: { $gte: createdAt } }).populate('customer_id').populate('restaurant_id').exec();
    const total = orders.reduce((total, order) => total + order.total_price, 0);
    const numberOfOrders = orders.length;
    const numberOfOrdersWithStatusDone = orders.filter(order => order.status === 'done').length;
    const numberOfOrdersWithStatusCanceled = orders.filter(order => order.status === 'canceled').length;
    const totalPriceOfOrdersWithStatusDone = orders.filter(order => order.status === 'done').reduce((total, order) => total + order.total_price, 0);
    const result = {
    numberOfOrders:numberOfOrders,
    done:numberOfOrdersWithStatusDone,
    cancel:numberOfOrdersWithStatusCanceled,
    totalDone:totalPriceOfOrdersWithStatusDone,
    totalAll: total,
    Detail:orders      
    };
    return result;
  }
}
