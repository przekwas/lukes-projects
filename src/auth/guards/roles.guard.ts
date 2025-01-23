import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/roles.decorator';

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

		const req = context.switchToHttp().getRequest();
		const user = req.user;

		if (!user) {
			throw new UnauthorizedException('No user found on request');
		}

		return requiredRoles.includes(user.role);
	}
}
