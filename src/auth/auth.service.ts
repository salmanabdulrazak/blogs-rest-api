import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.usersService.findOne({ email: authDto.email });

    if (!user) throw new UnauthorizedException('Invalid Credentials!');

    if (!(await bcrypt.compare(authDto.password, user.password)))
      throw new UnauthorizedException('Invalid Credentials!');

    const access_token = this.jwtService.sign({
      name: user.name,
      sub: user.id,
      role: user.role,
    });

    const result = {
      message: 'Login Successfull!',
      access_token,
    };

    return result;
  }
}
