import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CommandError } from './CommandError';

@Catch()
export class CQExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let commandError: CommandError;

        if (exception && typeof exception == 'object' 
            && Object.keys(exception).includes('success')
            && Object.keys(exception).includes('message')
            && Object.keys(exception).includes('code')
        ) {
            commandError = exception as any;
        } else if (exception instanceof CommandError) {
            commandError = exception as CommandError;
        } else if (exception instanceof HttpException) {
            const httpException = exception as HttpException;
            const response = httpException.getResponse();
            const code = (response as any)?.error as string || 'HTTP_ERROR';
            commandError = new CommandError(httpException.message, code, {exception: httpException});
        } else if (Array.isArray(exception) && exception[0] instanceof ValidationError) {
            commandError = new CommandError('Invalid payload ،،،!', 'VALIDATION_ERROR', exception);
        } else if ((exception as any).message) {
            commandError = new CommandError((exception as any).message, (exception as any).code || 'UNKNOWN_ERROR', exception);
        } else {
            commandError = new CommandError('Unkown error occired ،،،!', 'UNSPECIFIED_ERROR');
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: commandError.message,
            code: commandError.code,
            data: commandError.data,
        });
    }
}
