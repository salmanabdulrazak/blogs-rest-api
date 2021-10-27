import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import config from '../config/keys';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: config.JWTSECRET,
      signOptions: { expiresIn: config.JWTEXPIRESIN },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
