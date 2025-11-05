import { ApiError } from '@/shared/errors/ApiError';
import { ForbiddenError } from '@/shared/errors/ForbiddenError';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

export class BaseClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string, token?: string) {
    console.log('baseUrl', baseUrl);
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // В интерцепторе:
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('data', error.response.data.error);
        const errorData = error.response?.data?.error;
        const message = errorData?.message || 'неизвестная ошибка';
        const code = errorData?.code;
        if (code === 'FORBIDDEN') {
          throw new ForbiddenError(message, code);
        }
        throw new ApiError(message, code);
      },
    );
  }

  private buildConfig(options?: RequestOptions): AxiosRequestConfig {
    return {
      headers: options?.headers || {},
    };
  }

  public async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.get<T>(path, this.buildConfig(options));
    return response.data;
  }

  public async post<T>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const data = body || options?.body;
    const response = await this.client.post<T>(path, data, this.buildConfig(options));
    return response.data;
  }

  public async put<T>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const data = body || options?.body;
    const response = await this.client.put<T>(path, data, this.buildConfig(options));
    return response.data;
  }

  public async patch<T>(path: string, body?: any, options?: RequestOptions): Promise<T> {
    const data = body || options?.body;
    const response = await this.client.patch<T>(path, data, this.buildConfig(options));
    return response.data;
  }

  public async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.delete<T>(path, this.buildConfig(options));
    return response.data;
  }
}
