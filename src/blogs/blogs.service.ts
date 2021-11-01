import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './interfaces/blog.interface';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  async findAll(condition: any): Promise<Blog[]> {
    return await this.blogModel
      .find(condition, '-__v')
      .populate('category', 'name')
      .populate('publisher', 'name');
  }

  async findOne(condition: any): Promise<Blog> {
    return await this.blogModel
      .findOne(condition, '-__v')
      .populate('category', 'name')
      .populate('publisher', 'name');
  }

  async create(blog: Blog): Promise<Blog> {
    const newBlog = new this.blogModel(blog);
    return await newBlog.save();
  }

  async deleteOne(id: string): Promise<Blog> {
    return await this.blogModel.findByIdAndRemove(id);
  }

  async delete(condition: any): Promise<any> {
    return await this.blogModel.deleteMany(condition);
  }

  async update(id: string, blog: Blog): Promise<Blog> {
    return await this.blogModel.findByIdAndUpdate(id, blog, {
      new: true,
    });
  }
}
