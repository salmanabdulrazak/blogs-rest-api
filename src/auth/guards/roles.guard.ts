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
    const role = this.reflector.get<string[]>('role', context.getHandler());

    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (role != user.role)
      throw new UnauthorizedException('Unauthorized User!');

    return true;
  }
}
