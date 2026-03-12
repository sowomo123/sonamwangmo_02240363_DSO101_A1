// API service for communicating with the backend

import { Task, TaskFormData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  count?: number;
  message?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to handle API responses
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Helper method to handle API errors
  private async handleError(error: unknown): Promise<never> {
    console.error('API Error:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }

  // GET all tasks
  async getTasks(): Promise<ApiResponse<Task[]>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks`);
      return await this.handleResponse<Task[]>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET single task
  async getTask(id: string): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks/${id}`);
      return await this.handleResponse<Task>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST create task
  async createTask(taskData: TaskFormData): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      return await this.handleResponse<Task>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PUT update task
  async updateTask(id: string, taskData: TaskFormData): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      return await this.handleResponse<Task>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // DELETE task
  async deleteTask(id: string): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks/${id}`, {
        method: 'DELETE',
      });
      return await this.handleResponse<Task>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PATCH toggle task status
  async toggleTaskStatus(id: string): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${this.baseURL}/api/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await this.handleResponse<Task>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await this.handleResponse<{ message: string; timestamp: string }>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
