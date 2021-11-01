import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CategoryService } from 'src/category/category.service';
import { GetCurrentUser } from 'src/utils/get-user.decorator';
import { hasRole } from 'src/utils/has-role.decorator';
import { BlogsService } from './blogs.service';
import { AddBlogDto } from './dto/add-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly categoryService: CategoryService,
  ) {}

  @hasRole('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getAll')
  async getAllBlogs(@GetCurrentUser() user: any): Promise<any> {
    let condition: any = {};

    if (user.role == 'publisher') condition.publisherId = user.sub;

    let data: any = await this.blogsService.findAll(condition);

    const result = {
      message: 'Blogs List!',
      data,
    };

    return result;
  }

  @hasRole('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getOne/:id')
  async getOneBlog(@Param('id') id, @GetCurrentUser() user: any): Promise<any> {
    let condition: any = { _id: id };

    if (user.role == 'publisher') condition.publisherId = user.sub;

    let data: any = await this.blogsService.findOne(condition);

    if (!data) throw new BadRequestException('Invalid id!');

    const result = {
      message: 'Blog Details!',
      data,
    };

    return result;
  }

  @hasRole('publisher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  @UsePipes(new ValidationPipe())
  async addBlog(
    @Body() addBlogDto: AddBlogDto,
    @GetCurrentUser() user: any,
  ): Promise<any> {
    let checkCategory: any = await this.categoryService.findOne({
      _id: addBlogDto.categoryId,
    });
    if (!checkCategory) throw new BadRequestException('Invalid category!');

    addBlogDto.publisherId = user.sub;

    let data: any = await this.blogsService.create(addBlogDto);

    const result = {
      message: 'Blog created successfully!',
      data,
    };

    return result;
  }

  @hasRole('publisher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  async updateBlog(
    @Body() updateBlogDto: AddBlogDto,
    @Param('id') id,
    @GetCurrentUser() user: any,
  ): Promise<any> {
    let condition: any = { _id: id, publisherId: user.sub };

    let checkId: any = await this.blogsService.findOne(condition);
    if (!checkId) throw new BadRequestException('Invalid id!');

    let checkCategory: any = await this.categoryService.findOne({
      _id: updateBlogDto.categoryId,
    });
    if (!checkCategory) throw new BadRequestException('Invalid category!');

    let data: any = await this.blogsService.update(id, updateBlogDto);

    const result = {
      message: 'Blog updated successfully!',
      data,
    };

    return result;
  }

  @hasRole('publisher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteCategory(@Param('id') id, @GetCurrentUser() user: any) {
    let condition: any = { _id: id, publisherId: user.sub };

    let checkId: any = await this.blogsService.findOne(condition);
    if (!checkId) throw new BadRequestException('Invalid id!');

    await this.blogsService.deleteOne(id);

    const result = {
      message: 'Blog deleted successfully!',
      data: [],
    };

    return result;
  }
}
