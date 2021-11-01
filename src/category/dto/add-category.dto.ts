import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
