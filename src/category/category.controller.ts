import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRole } from 'src/utils/has-role.decorator';
import { AddCategoryDto } from './add-category.dto';
import { CategoryService } from './category.service';
import { Category } from './interfaces/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @hasRole('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getAll')
  async getAllCategories(): Promise<any> {
    let data: any = await this.categoryService.findAll({});

    const result = {
      message: 'Categories List!',
      data,
    };

    return result;
  }

  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getOne/:id')
  async getOneCategory(@Param('id') id): Promise<any> {
    let data: any = await this.categoryService.findOne({ _id: id });

    if (!data) throw new BadRequestException('Invalid id!');

    const result = {
      message: 'Category Details!',
      data,
    };

    return result;
  }

  @hasRole('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  @UsePipes(new ValidationPipe())
  async addCategory(@Body() addCategoryDto: AddCategoryDto): Promise<any> {
    const isExist = await this.categoryService.findOne({
      name: addCategoryDto.name,
    });

    if (isExist) throw new BadRequestException('Category already exists!');

    let data: any = await this.categoryService.create(addCategoryDto);

    const result = {
      message: 'Category created successfully!',
      data,
    };

    return result;
  }
}
