/**
 * API Service
 * Centralized API client using axios and environment variables
 * Demonstrates how to use API_KEY from .env file with interceptors
 */

import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import Config from 'react-native-config';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: Config.API_BASE_URL || 'https://api.example.com',
      timeout: parseInt(Config.API_TIMEOUT || '30000', 10),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors() {
    // Request interceptor - add API key to all requests
    this.client.interceptors.request.use(
      (config) => {
        const apiKey = Config.API_KEY || '';
        if (apiKey && config.headers) {
          config.headers.Authorization = `Bearer ${apiKey}`;
          // Or use 'X-API-Key': apiKey if your API expects it this way
        }

        // Log request in development
        if (Config.APP_ENV === 'development') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors globally
    this.client.interceptors.response.use(
      (response) => {
        // Log response in development
        if (Config.APP_ENV === 'development') {
          console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
        }
        return response;
      },
      (error: AxiosError) => {
        // Handle different error types
        if (error.response) {
          // Server responded with error status
          console.error('[API Error]', error.response.status, error.response.data);
        } else if (error.request) {
          // Request made but no response received
          console.error('[API Error] No response received', error.message);
        } else {
          // Something else happened
          console.error('[API Error]', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(endpoint, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config);
    return response.data;
  }

  /**
   * Get axios instance for advanced usage
   */
  getClient(): AxiosInstance {
    return this.client;
  }

  /**
   * Example: Fetch users
   */
  async getUsers() {
    return this.get<any[]>('/users');
  }

  /**
   * Example: Fetch user by ID
   */
  async getUser(id: string) {
    return this.get<any>(`/users/${id}`);
  }

  /**
   * Example: Create user
   */
  async createUser(userData: any) {
    return this.post<any>('/users', userData);
  }

  /**
   * Example: Update user
   */
  async updateUser(id: string, userData: any) {
    return this.put<any>(`/users/${id}`, userData);
  }

  /**
   * Example: Delete user
   */
  async deleteUser(id: string) {
    return this.delete<any>(`/users/${id}`);
  }
}

// Export singleton instance
export const api = new ApiService();
