export class CommandResponse<T> {
    success: boolean = true;
    message: string = '';
    code: string = '';
    data: T = {} as T;

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
