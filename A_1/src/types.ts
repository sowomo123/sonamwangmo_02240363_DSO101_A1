// TypeScript types for the To-Do List application

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: Date;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: 'pending' | 'completed';
}
