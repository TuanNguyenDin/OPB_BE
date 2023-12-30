import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service_order.dto';
import { UpdateServiceOrderDto } from './dto/update-service_order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceOrder } from './entities/service_order.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class ServiceOrderService {
  constructor(
    @InjectModel('ServiceOrder') private readonly serviceOderModel: Model<ServiceOrder>,
    @InjectModel('Order') private readonly orderModel: Model<Order>
  ){}
  async create(createServiceOrderDto: CreateServiceOrderDto) {
    return await this.serviceOderModel.create(createServiceOrderDto);
  }

  async findAll() {
    return await this.serviceOderModel.find().populate('order_id').populate('service_id').populate('created_by').exec();
  }

  async findOne(id: string) {
    return (await this.serviceOderModel.findById(id)).populated('order_id').populate('service_id').populate('created_by').exec();
  }
  async findByOrderId(id: string) {
    return await this.serviceOderModel.find({order_id: id}).populate('order_id').populate('service_id').populate('created_by').exec();
  }

  async update(id: string, updateServiceOrderDto: UpdateServiceOrderDto) {
    return await this.serviceOderModel.findByIdAndUpdate(id,updateServiceOrderDto)
  }

  async remove(id: string) {
    return await this.serviceOderModel.findByIdAndRemove(id);
  }
}
