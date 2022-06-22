import { HttpException, HttpStatus } from '@nestjs/common';

export class CommandResponse<T> {
    success: boolean;
    message: string;
    code: string;
    data: T;

    static error<T>(message: string, code: string, data: T = {} as T): CommandResponse<T> {
        return {
            success: false,
            message,
            code,
            data,
        };
    }
    
    static success<T>(message: string, code: string, data: T = {} as T): CommandResponse<T> {
        return {
            success: true,
            message,
            code,
            data,
        };
    }
}


export class CommandError<T> extends HttpException {
    success: true;

    constructor(readonly message: string, readonly code: string, readonly data: any = {}) {
        super(CommandResponse.error(message, code, data), HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = 'CommandError';
    }
    getHttpResponse(): CommandResponse<T> {
        return CommandResponse.error(this.message, this.code, this.data);
    }
}

