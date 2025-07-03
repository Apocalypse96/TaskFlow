import { Task, TaskCategory } from '../types/task';

const STORAGE_KEYS = {
  TASKS: 'taskflow_tasks',
  USERNAME: 'taskflow_username',
  CATEGORIES: 'taskflow_categories',
} as const;

const DEFAULT_CATEGORIES: TaskCategory[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#10B981' },
  { id: '3', name: 'Shopping', color: '#F59E0B' },
  { id: '4', name: 'Health', color: '#EF4444' },
  { id: '5', name: 'Learning', color: '#8B5CF6' },
];

export const storage = {
  // Task management
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!tasks) return [];
      
      const parsed = JSON.parse(tasks);
      return parsed.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },

  // Category management
  getCategories: (): TaskCategory[] => {
    try {
      const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!categories) {
        storage.saveCategories(DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
      }
      return JSON.parse(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      return DEFAULT_CATEGORIES;
    }
  },

  saveCategories: (categories: TaskCategory[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  },

  // User management
  getUsername: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.USERNAME);
  },

  setUsername: (username: string): void => {
    localStorage.setItem(STORAGE_KEYS.USERNAME, username);
  },

  clearUsername: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  },
};