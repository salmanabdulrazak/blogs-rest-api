import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (role == user.role) return true;

    if (role == 'all' && (user.role == 'admin' || user.role == 'publisher'))
      return true;

    throw new UnauthorizedException('Unauthorized User!');
  }
}
