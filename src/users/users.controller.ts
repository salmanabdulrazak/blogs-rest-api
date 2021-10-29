import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetCurrentUser } from 'src/utils/get-user.decorator';
import { hasRole } from 'src/utils/has-role.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getAllPublishers')
  getAllPublishers(@GetCurrentUser() user: any): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('getOnePublisher/:id')
  getOnePublisher(@Param('id') id): Promise<User> {
    return this.usersService.findOne({ _id: id });
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createPublisher(@Body() createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.usersService.findOne({
      email: createUserDto.email,
    });

    if (isExist) throw new BadRequestException('Email id already exists!');

    createUserDto.role = 'publisher';

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    return this.usersService.createUser(createUserDto);
  }
}
