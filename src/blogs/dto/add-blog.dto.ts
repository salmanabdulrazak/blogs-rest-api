import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDto {
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

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  publisherId: string;
}
