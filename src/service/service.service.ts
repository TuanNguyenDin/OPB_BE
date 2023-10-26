import { HttpException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './entities/service.entity';
import { Model } from 'mongoose';
import { Account } from 'src/auth/entities/user.entities';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel('Service') private readonly serviceModel: Model<Service>,
    @InjectModel('Account') private readonly AccountModel: Model<Account>
  ){}
  async create(createServiceDto: CreateServiceDto, use_id:string) {
    const user = await this.AccountModel.findById(use_id).exec();
    if(!user){throw new HttpException('Can not find user',404)}
    if(user.role === 'customer'){throw new HttpException('User not authorized',403)}
    return await this.serviceModel.create(createServiceDto);
  }

  async findAll() {
    return await this.serviceModel.find().exec();
  }

  async findOne(id: string) {
    return await this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel.findByIdAndUpdate(id,updateServiceDto).exec()
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndRemove(id).exec();
  }
}
