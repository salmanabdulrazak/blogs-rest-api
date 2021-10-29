import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
