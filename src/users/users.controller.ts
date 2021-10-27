import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAllPublishers')
  getAllPublishers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('getOnePublisher/:id')
  getOnePublisher(@Param('id') id): Promise<User> {
    return this.usersService.findOne({ _id: id });
  }

  @Post('register')
  async createPublisher(@Body() createUserDto: CreateUserDto): Promise<User> {
    createUserDto.role = 'publisher';
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.usersService.createUser(createUserDto);
  }
}
