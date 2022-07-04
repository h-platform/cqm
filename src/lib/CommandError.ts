import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandResponse } from './CommandResponse';

export class CommandError extends HttpException {
    success: boolean = false;
    
    constructor(readonly message: string, readonly code: string, readonly data: any = {}) {
        super(CommandResponse.error(message, code, data), HttpStatus.INTERNAL_SERVER_ERROR);
        this.name = 'CommandError';
    }
    
    getHttpResponse(): any {
        return CommandResponse.error(this.message, this.code, this.data);
    }
}
