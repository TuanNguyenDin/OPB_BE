import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDocument } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(@InjectModel('Address') private addressModel:Model<AddressDocument>) {}
  async create(createAddressDto: CreateAddressDto) {
    return await this.addressModel.create(createAddressDto);
  }

  async findAll() {
    return await this.addressModel.find();
  }

  async findOne(id: string) {
    return await this.addressModel.findById(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.addressModel.findByIdAndUpdate(id, updateAddressDto);
  }

  async remove(id: string) {
    return await this.addressModel.findByIdAndDelete(id);
  }
}
