import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { TaskCategory } from '../types/task';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryManagerProps {
  categories: TaskCategory[];
  onAddCategory: (name: string, color: string) => void;
}

const PRESET_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
}) => {
  const { isDarkMode } = useTheme();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    onAddCategory(newCategoryName.trim(), selectedColor);
    setNewCategoryName('');
    setSelectedColor(PRESET_COLORS[0]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewCategoryName('');
    setSelectedColor(PRESET_COLORS[0]);
    setIsAdding(false);
  };

  return (
    <div className={`rounded-lg p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Manage Categories
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className={`p-1 rounded-md transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className={`w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            autoFocus
            required
          />
          <div className="grid grid-cols-5 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color ? 'border-gray-400 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className={`flex-1 px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newCategoryName.trim()}
              className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </form>
      )}

      <div className="space-y-1">
        {categories.slice(0, 5).map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-2 px-2 py-1 text-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {category.name}
            </span>
          </div>
        ))}
        {categories.length > 5 && (
          <p className={`text-xs px-2 py-1 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            +{categories.length - 5} more
          </p>
        )}
      </div>
    </div>
  );
};