import React from 'react';
import { Folder, FolderOpen } from 'lucide-react';
import { TaskCategory } from '../types/task';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryFilterProps {
  categories: TaskCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-lg p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <h3 className={`text-sm font-medium mb-3 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        Categories
      </h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
            !selectedCategory
              ? isDarkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-50 text-blue-600'
              : isDarkMode
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {!selectedCategory ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
              selectedCategory === category.id
                ? isDarkMode
                  ? 'bg-blue-900 text-blue-300'
                  : 'bg-blue-50 text-blue-600'
                : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};