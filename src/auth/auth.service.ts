import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(authDto: AuthDto) {
    const user = await this.usersService.findOne({ email: authDto.email });

    if (!user) throw new UnauthorizedException('Invalid Credentials!');

    if (!(await bcrypt.compare(authDto.password, user.password)))
      throw new UnauthorizedException('Invalid Credentials!');

    return user;
  }
}
