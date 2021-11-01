import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBlogDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;

  publisherId: string;
}
