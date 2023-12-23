import { HttpException, Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notify } from './entities/notify.entity';
import { Account } from 'src/auth/entities/user.entities';

@Injectable()
export class NotifyService {
  constructor(@InjectModel('Notify') private readonly NotifyModel: Model<Notify>,
    @InjectModel('Account') private readonly AccountModel: Model<Account>) { }
  async create(createNotifyDto: CreateNotifyDto) {
    const sendTo = this.AccountModel.findById(createNotifyDto.send_to);
    if (!sendTo) {throw new HttpException('User not found', 404);}
    createNotifyDto.isRead = false;
    return await this.NotifyModel.create(createNotifyDto);
  }

  async findAll() {
    return await this.NotifyModel.find().populate('send_to').populate('created_by').exec();
  }

  async findOne(id: string) {
    const notify= await this.NotifyModel.findById(id).populate('send_to').populate('created_by').exec();
    if (!notify) {throw new HttpException('Notify not found', 404);}
    return notify;
  }

  async update(id: string, updateNotifyDto: UpdateNotifyDto) {
    return await this.NotifyModel.findByIdAndUpdate(id, updateNotifyDto, {new: true});
  }

  remove(id: string) {
    return `This action don't support for this version. please wait for the orther version.`;
  }

  async findByCondition(prop: string,value:any){
    return await this.NotifyModel.find({[prop]:value}).populate('send_to').populate('created_by').exec();
  }
  async updateIsReadByCondition(prop: string,value:any){
    return await this.NotifyModel.updateMany({[prop]:value},{$set:{isRead:true}});
  }
}
