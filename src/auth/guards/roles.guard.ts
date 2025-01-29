import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../../common/roles.decorator';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}

		const req = context.switchToHttp().getRequest<AuthRequest>();
		const user = req.user;

		if (!user) {
			throw new UnauthorizedException('No user found on request');
		}

		return requiredRoles.includes(user.role);
	}
}
