import { HttpException, Injectable } from '@nestjs/common';
import { CreateComboMenuDto, CreateFoodPackageDto, CreateServicePackageDto } from './dto/create-combo_menu.dto';
import { UpdateComboMenuDto } from './dto/update-combo_menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComboMenu, FoodPackage, ServicePackage } from './entities/combo_menu.entity';

@Injectable()
export class ComboMenuService {
  constructor(
    @InjectModel('ComboMenu') private readonly comboMenuModel: Model<ComboMenu>,
    @InjectModel('FoodPackage') private readonly foodPackageModel: Model<FoodPackage>,
    @InjectModel('ServicePackage') private readonly servicePackageModel: Model<ServicePackage>,
  ) { }
  async createPackage(createPackageDto: CreateComboMenuDto | CreateFoodPackageDto | CreateServicePackageDto, modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return await this.comboMenuModel.create(createPackageDto as CreateComboMenuDto);
      case 'food':
        return await this.foodPackageModel.create(createPackageDto as CreateFoodPackageDto);
      case 'service':
        return await this.servicePackageModel.create(createPackageDto as CreateServicePackageDto);
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }


  async findAll(modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return await this.comboMenuModel.find().exec();
      case 'food':
        return await this.foodPackageModel.find().exec();
      case 'service':
        return await this.servicePackageModel.find().exec();
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }

  async findOne(id: string, modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return await this.comboMenuModel.findById(id).exec();
      case 'food':
        return await this.foodPackageModel.findById(id).exec();
      case 'service':
        return await this.servicePackageModel.findById(id).exec();
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }
  async findByRestaurant(id: string, modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return await this.comboMenuModel.findOne({restaurant_id: id}).exec();
      case 'food':
        return await this.foodPackageModel.findOne({restaurant_id: id}).exec();
      case 'service':
        return await this.servicePackageModel.findOne({restaurant_id: id}).exec();
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }

  update(id: string, createPackageDto: CreateComboMenuDto | CreateFoodPackageDto | CreateServicePackageDto, modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return this.comboMenuModel.findByIdAndUpdate(id, createPackageDto as CreateComboMenuDto);
      case 'food':
        return this.foodPackageModel.findByIdAndUpdate(id, createPackageDto as CreateFoodPackageDto);
      case 'service':
        return this.servicePackageModel.findByIdAndUpdate(id, createPackageDto as CreateServicePackageDto);
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }

  remove(id: string, modelType: 'combo' | 'food' | 'service') {
    switch (modelType) {
      case 'combo':
        return this.comboMenuModel.findByIdAndDelete(id);
      case 'food':
        return this.foodPackageModel.findByIdAndDelete(id);
      case 'service':
        return this.servicePackageModel.findByIdAndDelete(id);
      default:
        throw new HttpException('Invalid model type name', 400);
    }
  }
}
