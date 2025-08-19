import { Controller, Get } from '@nestjs/common';
import { env } from '@lukes-projects/config';

@Controller('health')
export class HealthController {
	@Get()
	get() {
		return { ok: true, env: env.NODE_ENV };
	}
}
