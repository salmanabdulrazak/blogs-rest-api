import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAllUsers(condition: any): Promise<User[]> {
    return await this.userModel.find(condition, '-password -__v');
  }

  async findOne(condition: any): Promise<User> {
    return await this.userModel.findOne(condition, '-__v');
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
