import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import config from './config/keys';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(config.mongoURI), AuthModule, CategoryModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
