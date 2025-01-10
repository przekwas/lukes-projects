import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HardcodedGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		const secretHeader = request.headers['x-my-secret'];
		if (secretHeader !== 'supersecret') {
			throw new UnauthorizedException('Invalid or missing secret header');
		}

		return true;
	}
}
