import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddBlogDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  categoryId: string;

  publisherId: string;
}
