export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  category?: string;
  tags?: string[];
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
}