import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(condition: any): Promise<Category[]> {
    return await this.categoryModel.find(condition, '-__v');
  }

  async findOne(condition: any): Promise<Category> {
    return await this.categoryModel.findOne(condition, '-__v');
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }
}
