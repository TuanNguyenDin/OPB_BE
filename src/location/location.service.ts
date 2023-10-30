import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(@InjectModel('Location') private locationModel:Model<Location>) {}
  async create(createLocationDto: CreateLocationDto) {
    return await this.locationModel.create(createLocationDto);
  }

  async findAll() {
    return await this.locationModel.find();
  }

  async findOne(id: string) {
    return await this.locationModel.findById(id);
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    return await this.locationModel.findByIdAndUpdate(id, updateLocationDto);
  }

  async remove(id: string) {
    return await this.locationModel.findByIdAndDelete(id);
  }
}
