import React from 'react';
import { CheckCircle, Clock, Inbox } from 'lucide-react';
import { Task, TaskCategory } from '../types/task';
import { TaskItem } from './TaskItem';
import { useTheme } from '../contexts/ThemeContext';

interface TaskListProps {
  tasks: Task[];
  categories: TaskCategory[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: 'all' | 'completed' | 'pending';
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  onUpdate,
  onToggle,
  onDelete,
  filter,
}) => {
  const { isDarkMode } = useTheme();

  if (tasks.length === 0) {
    const emptyStateConfig = {
      all: {
        icon: Inbox,
        title: "No tasks yet",
        description: "Create your first task to get started!"
      },
      completed: {
        icon: CheckCircle,
        title: "No completed tasks",
        description: "Complete some tasks to see them here."
      },
      pending: {
        icon: Clock,
        title: "No pending tasks",
        description: "Great! You've completed all your tasks."
      }
    };

    const config = emptyStateConfig[filter];
    const Icon = config.icon;

    return (
      <div className="text-center py-12">
        <Icon className={`h-16 w-16 mx-auto mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-600' : 'text-gray-300'
        }`} />
        <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {config.title}
        </h3>
        <p className={`transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {config.description}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          categories={categories}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};