import { HttpException, Injectable } from '@nestjs/common';
import { CreateComboMenuDto } from './dto/create-combo_menu.dto';
import { UpdateComboMenuDto } from './dto/update-combo_menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComboMenu } from './entities/combo_menu.entity';

@Injectable()
export class ComboMenuService {
  constructor(
    @InjectModel('ComboMenu') private readonly comboMenuModel: Model<ComboMenu>
  ) { }
  async createPackage(createPackageDto: CreateComboMenuDto) {
    return await this.comboMenuModel.create(createPackageDto);
  }

  async findAll() {
    return await this.comboMenuModel.find().populate('service_id').populate('food_id').exec();
  }

  async findOne(id: string) {
    return await this.comboMenuModel.findById(id).exec();
  }
  async findByRestaurant(id: string) {
    return await this.comboMenuModel.find({ restaurant_id: id }).exec();
  }

  update(id: string, createPackageDto: CreateComboMenuDto) {
    return this.comboMenuModel.findByIdAndUpdate(id, createPackageDto);
  }

  remove(id: string) {
    return this.comboMenuModel.findByIdAndDelete(id);
  }
}
