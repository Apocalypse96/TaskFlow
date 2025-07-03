import React from 'react';
import { TaskFilter } from '../types/task';
import { useTheme } from '../contexts/ThemeContext';

interface FilterTabsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}) => {
  const { isDarkMode } = useTheme();
  
  const tabs = [
    { key: 'all' as TaskFilter, label: 'All Tasks', count: taskCounts.all },
    { key: 'pending' as TaskFilter, label: 'Pending', count: taskCounts.pending },
    { key: 'completed' as TaskFilter, label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className={`flex space-x-1 p-1 rounded-lg transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onFilterChange(tab.key)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === tab.key
              ? isDarkMode
                ? 'bg-gray-700 text-blue-400 shadow-sm'
                : 'bg-white text-blue-600 shadow-sm'
              : isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {tab.label}
          <span className={`ml-2 text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
            activeFilter === tab.key
              ? isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-600'
              : isDarkMode
                ? 'bg-gray-600 text-gray-300'
                : 'bg-gray-200 text-gray-600'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};