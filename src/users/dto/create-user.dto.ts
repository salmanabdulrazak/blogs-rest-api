import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  role: string;
}
