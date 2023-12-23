import { HttpException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './entities/feedback.entity';
import { Order } from 'src/order/entities/order.entity';
import { Account } from 'src/auth/entities/user.entities';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private readonly feedbackModel: Model<Feedback>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Account') private readonly accountModel: Model<Account>,
  ) { }
  async create(createFeedbackDto: CreateFeedbackDto) {
    const order = this.orderModel.findById(createFeedbackDto.orderId);
    const user = this.accountModel.findById(createFeedbackDto.userId);
    if (!order && !user) { throw new HttpException('Order and User not found', 404) }
    if (!order) { throw new HttpException('Order not found', 404) }
    if (!user) { throw new HttpException('User not found', 404) }
    const feedback = await this.feedbackModel.findOne({ orderId: createFeedbackDto.orderId });
    if (feedback) { throw new HttpException('Feedback already exists with Id:' + feedback._id, 409) }
    return await this.feedbackModel.create(createFeedbackDto);
  }

  async findAll() {
    return await this.feedbackModel.find().populate('orderId').populate('userId').exec();
  }

  async findOne(id: string) {
    const feedback = await this.feedbackModel.findById(id).populate('orderId').populate('userId').exec();
    if (!feedback) { throw new HttpException('Feedback not found', 404) }
    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return await this.feedbackModel.findByIdAndUpdate(id, updateFeedbackDto, { new: true });
  }

  async remove(id: string) {
    return await this.feedbackModel.findByIdAndDelete(id);
  }
}
