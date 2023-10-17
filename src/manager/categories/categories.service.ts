import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoriesModel:Model<Category>) {}
  async create(data) {
    const newCategory = {
      categoryName: data.categoryName,
      description: data.description,
      ImageURL: data.ImageURL,
      restaurantsID: data.restaurantsID,
    };
    return (await this.categoriesModel.create(newCategory)).save();
  }

  async findAll() {
    return await this.categoriesModel.find().exec();
  }

  async findOne(id: string) {
    return await this.categoriesModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto) {
    const currentEntity = await this.categoriesModel.findById(id).exec();
    if(!currentEntity) {throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);}
    if(currentEntity.description === 'deactivate') {throw new HttpException('This restaurant no longer activate', HttpStatus.OK);}
    if(currentEntity.categoryName!== updateCategoryDto.categoryName) {currentEntity.categoryName = updateCategoryDto.categoryName;}
    if(currentEntity.description!== updateCategoryDto.description) {currentEntity.description = updateCategoryDto.description;}
    if(currentEntity.ImageURL!== updateCategoryDto.ImageURL) {currentEntity.ImageURL = [...updateCategoryDto.ImageURL];}
    return await this.categoriesModel.findByIdAndUpdate(id, currentEntity).exec();

  }

  async remove(id: string) {
    return await this.categoriesModel.findByIdAndUpdate(id, {description: 'deactivate'}).exec();
  }
}
