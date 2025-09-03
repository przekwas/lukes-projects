import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class JsonErrorFilter implements ExceptionFilter {
	catch(err: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse();
		const req = ctx.getRequest();

		const isHttp = err instanceof HttpException;
		const status = isHttp ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const payload = isHttp ? (err.getResponse() as any) : { message: 'Internal Server Error' };

		const error = typeof payload === 'string' ? { message: payload } : payload;

		res.status(status).send({
			ok: false,
			error: {
				status,
				path: req.url,
				message: error.message ?? 'Error',
				code: (error.code as string) ?? undefined,
				details: (error.errors as any) ?? undefined
			}
		});
	}
}
