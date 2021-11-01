import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
