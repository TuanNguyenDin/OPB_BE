import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from './entities/manager.entity';
import { updateCurrentUser } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';

@Injectable()
export class ManagerService {
  constructor(@InjectModel('Manager') private managerRepository: Model<Manager>) { }
  async create(userdata) {
    const newManager = {
      ...userdata,
      dateStart: new Date(),
      position: 'manager'
    }
    return await new this.managerRepository(newManager).save();
  }

  async findAll() {
    return await this.managerRepository.find();
  }

  async findOne(id: number) {
    return await this.managerRepository.findById(id);
  }

  async update(id, updateManagerDto) {
    try {

      return await this.managerRepository.findByIdAndUpdate(id, updateManagerDto);
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
        case 'auth/user-disabled':
          throw new HttpException('User disabled', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async remove(id: number) {
    const manager = this.managerRepository.findById(id);
    return await this.managerRepository.findByIdAndUpdate(id, {
      ...manager,
      dateEnd: new Date(),
      status: 'deleted'
    });
  }
}
