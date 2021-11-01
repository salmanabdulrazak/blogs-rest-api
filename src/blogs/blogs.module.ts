import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogSchema } from './schemas/blog.schema';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
