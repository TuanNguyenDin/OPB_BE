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
  ) { }
  async create(createOrderDto: CreateOrderDto, useID: string, restaurantID: string) {
    const creator = await this.accountModel.findById(useID);
    const restaurant = await this.restaurantModel.findById(restaurantID);
    if (!creator) { throw new HttpException('User not found', 404); }
    if (creator.role !== 'customer') { throw new HttpException('User not authorized', 403); }
    if (!restaurant) { throw new HttpException('Restaurant not found', 404); }
    createOrderDto.customer_id = useID;
    createOrderDto.restaurant_id = restaurantID;
    createOrderDto.created_by = useID;
    const manager = await this.accountModel.find({ role: 'manager', status: 'activated' }).exec();
    manager.forEach(async (user) => {
      const notify = await this.NotifyModel.create({
        title: 'Có Đơn Hàng mới đang chờ',
        content: `Bạn đã có một đơn hàng mới chờ xét duyệt`,
        send_to: user._id,
        created_by: useID,
        isRead: false
      });
      console.log(notify);

    })
    return await this.orderModel.create(createOrderDto);
  }

  async findAll() {
    try {
      const expiredOrders = await this.orderModel.find({ ended_at: { $lt: new Date() }, status: { $nin: ['done', 'canceled'] } }).exec();
      expiredOrders.forEach(async (order) => {
        const notify = await this.NotifyModel.create({
          title: 'Đơn hàng đã quá hạn',
          content: `Đơn hàng ${order._id} đã quá hạn`,
          send_to: order.customer_id,
          created_by: 'system',
          isRead: false
        });

        const managers = await this.accountModel.find({ role: 'manager', status: 'activated' }).exec();
        managers.forEach(async (manager) => {
          const managerNotify = await this.NotifyModel.create({
            title: 'Đơn hàng đã quá hạn',
            content: `Đơn hàng ${order._id} đã quá hạn`,
            send_to: manager._id,
            created_by: 'system',
            isRead: false
          });
        });
      });
    } catch (error) {
      console.log(error);

    }
    return await this.orderModel.find().populate('customer_id').populate('restaurant_id').exec();
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id).populate('customer_id').populate('restaurant_id').exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, useID: string) {
    const creator = await this.accountModel.findById(useID);

    if (!creator) { throw new HttpException('User not found', 404); }
    updateOrderDto.updated_by = useID;

    const reason = updateOrderDto.description || '';
    const order = await this.orderModel.findById(id);
    if (!order) { throw new HttpException('Order not found', 404); }
    try {
      let content = ''; let title = '';
      switch (updateOrderDto.status) {
        case 'canceled':
          title = 'Đơn hàng của bạn đã bị hủy';
          content = `Đơn hàng ${order._id} của bạn đã bị hủy. ${reason}`;
          break;
        case 'accepted':
          title = 'Đơn hàng của bạn đã được chấp nhận';
          content = `Đơn hàng ${order._id} của bạn đã được chấp nhận`;
          break;
        case 'prepares':
          title = 'Đơn hàng của bạn đang được chuẩn bị';
          content = `Đơn hàng ${order._id} của bạn đang được chuẩn bị`;
          break;
        default:
          title = 'Đơn hàng của bạn đang được xem xét';
          content = `Đơn hàng ${order._id} của bạn đang được xem xét`;
          break;
      }

      const notify1 = await this.NotifyModel.create({
        title: title,
        content: content,
        send_to: order.customer_id,
        created_by: useID,
        isRead: false
      });
      if (updateOrderDto.status === "canceled") {
        const manager = await this.accountModel.find({ role: 'manager', status: 'activated' }).exec();
        manager.forEach(async (user) => {
          const notify = await this.NotifyModel.create({
            title: 'Có Đơn Hàng đã bị hủy',
            content: `Bạn đã có một đơn hàng đã bị hủy. ${reason}`,
            send_to: user._id,
            created_by: useID,
            isRead: false
          });
        })
      }

    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }

    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  async findByCreatedAt(createdAt: Date) {
    const orders = await this.orderModel.find({ createdAt: { $gte: createdAt } }).populate('customer_id').populate('restaurant_id').exec();
    const total = orders.reduce((total, order) => total + order.total_price, 0);
    const numberOfOrders = orders.length;
    const numberOfOrdersWithStatusDone = orders.filter(order => order.status === 'done').length;
    const numberOfOrdersWithStatusCanceled = orders.filter(order => order.status === 'canceled').length;
    const totalPriceOfOrdersWithStatusDone = orders.filter(order => order.status === 'done').reduce((total, order) => total + order.total_price, 0);
    const result = {
      numberOfOrders: numberOfOrders,
      done: numberOfOrdersWithStatusDone,
      cancel: numberOfOrdersWithStatusCanceled,
      totalDone: totalPriceOfOrdersWithStatusDone,
      totalAll: total,
      Detail: orders
    };
    return result;
  }
}
