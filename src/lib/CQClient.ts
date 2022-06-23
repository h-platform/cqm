import axios from 'axios';
import { CommandResponse } from './CommandResponse';

export class CQClient {
    constructor(
        private readonly baseUrl,
        private readonly token,
    ) { }

    async command<T>(module: string, command: string, payload: any): Promise<CommandResponse<any>> {
        try {
            const { data } = await axios.post<CommandResponse<any>>(`${this.baseUrl}/${module}/commands/${command}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            return data as CommandResponse<T>;
        } catch (err) {
            throw this.handleError(err);
        }
    }

    async query(module: string, query: string, payload: any) {
        try {
            const { data } = await axios.post(`${this.baseUrl}/${module}/queries/${query}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            return data;
        } catch (err) {
            throw this.handleError(err);
        }
    }

    async post<T>(url: string, payload: any) {
        try {
            const response = await axios.post<T>(`${this.baseUrl}/${url}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                }
            })
            return response.data as T
        } catch (err) {
            throw this.handleError(err);
        }
    }

    handleError(err: any) {
        if (err.isAxiosError) {
            return err.response.data
        } else {
            return err
        }
    }
}

