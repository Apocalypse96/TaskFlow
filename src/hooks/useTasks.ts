import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter, TaskCategory } from '../types/task';
import { storage } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Load tasks and categories from localStorage on mount
  useEffect(() => {
    const savedTasks = storage.getTasks();
    const savedCategories = storage.getCategories();
    setTasks(savedTasks);
    setCategories(savedCategories);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    storage.saveCategories(categories);
  }, [categories]);

  // Add new task
  const addTask = useCallback((
    title: string, 
    description?: string, 
    priority?: 'low' | 'medium' | 'high',
    dueDate?: Date,
    category?: string,
    tags?: string[]
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date(),
      priority: priority || 'medium',
      dueDate,
      category,
      tags: tags?.filter(tag => tag.trim()) || [],
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  // Update task
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  // Toggle task completion
  const toggleTask = useCallback((id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined
            }
          : task
      )
    );
  }, []);

  // Delete task
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  // Add new category
  const addCategory = useCallback((name: string, color: string) => {
    const newCategory: TaskCategory = {
      id: crypto.randomUUID(),
      name: name.trim(),
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  }, []);

  // Filter tasks based on current filter, search query, and category
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || task.category === selectedCategory;
    
    return matchesFilter && matchesSearch && matchesCategory;
  });

  // Sort tasks by priority and due date
  const sortedTasks = filteredTasks.sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Then by due date (overdue first)
    if (a.dueDate && b.dueDate) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Finally by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  // Get task counts
  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  return {
    tasks: sortedTasks,
    categories,
    taskCounts,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    addCategory,
  };
};