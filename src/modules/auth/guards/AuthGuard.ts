import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { config } from 'dotenv';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/modules/auth/decorators/Public.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { ROLES_KEY } from 'src/modules/auth/decorators/Roles.decorator';

config();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    if (!token) {
      throw new UnauthorizedException('JWT token missing');
    }

    try {
      const payload = await this.authService.validate(token);

      request['user'] = payload;
    } catch (error) {
      console.error(error?.message || error);
      throw new UnauthorizedException('Invalid JWT token');
    }

    const requiredRole = this.reflector.get<string>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (requiredRole) {
      const userRole = request['user'].role;
      const hasRole = requiredRole === userRole;
      if (!hasRole) {
        throw new UnauthorizedException('You can not access this Route');
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const token = request.headers.authorization;
    if (!token) {
      return null;
    }
    return token;
  }
}
