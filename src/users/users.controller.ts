import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAllPublishers')
  getAllPublishers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('getOnePublisher/:id')
  getOnePublisher(@Param('id') id): Promise<User> {
    return this.usersService.findOneUser(id);
  }

  @Post('register')
  createPublisher(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
