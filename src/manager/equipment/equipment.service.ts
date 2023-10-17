import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(@InjectModel('Equipment') private readonly equipmentModel: Model<Equipment>) {}
  async create(data) {
    const equipment = {
      equipmentname: data.equipmentname,
      type: data.type,
      description: data.description,
      price: data.price,
      ImageURL: data.ImageURL,
      restaurantsID: data.restaurantsID,
    }
    return await this.equipmentModel.create(equipment);
  }

  async findAll() {
    return await this.equipmentModel.find().exec();
  }

  async findOne(id: string) {
    return await this.equipmentModel.findById(id).exec();
  }

  async update(id: string, updateEquipmentDto) {
    const currentEntity = await this.equipmentModel.findById(id).exec();
    if(!currentEntity) {throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);}
    if(currentEntity.description === 'deactivate') {throw new HttpException('This restaurant no longer activate', HttpStatus.OK);}
    if(currentEntity.equipmentName!== updateEquipmentDto.equipmentName) {currentEntity.equipmentName = updateEquipmentDto.equipmentName;}
    if(currentEntity.description!== updateEquipmentDto.description) {currentEntity.description = updateEquipmentDto.description;}
    if(currentEntity.price!== updateEquipmentDto.price){currentEntity.price = updateEquipmentDto.price}
    if(currentEntity.ImageURL!== updateEquipmentDto.ImageURL) {currentEntity.ImageURL = [...updateEquipmentDto.ImageURL];}
    return await this.equipmentModel.findByIdAndUpdate(id, currentEntity).exec();
  }

  async remove(id: string) {
    return await this.equipmentModel.findByIdAndUpdate(id, {description: 'deactivate'}).exec();
  }
}
