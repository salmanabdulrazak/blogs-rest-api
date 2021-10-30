import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
