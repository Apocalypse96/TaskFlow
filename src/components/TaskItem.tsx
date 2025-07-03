import React, { useState } from 'react';
import { Check, Edit2, Trash2, Save, X, Calendar, Flag, Hash, Clock, AlertTriangle } from 'lucide-react';
import { Task, TaskCategory } from '../types/task';
import { useTheme } from '../contexts/ThemeContext';

interface TaskItemProps {
  task: Task;
  categories: TaskCategory[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  categories,
  onUpdate,
  onToggle,
  onDelete,
}) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  );
  const [editCategory, setEditCategory] = useState(task.category || '');
  const [editTagInput, setEditTagInput] = useState('');
  const [editTags, setEditTags] = useState(task.tags || []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    
    const dueDateObj = editDueDate ? new Date(editDueDate) : undefined;
    
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: dueDateObj,
      category: editCategory || undefined,
      tags: editTags.length > 0 ? editTags : undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'medium');
    setEditDueDate(task.dueDate ? task.dueDate.toISOString().split('T')[0] : '');
    setEditCategory(task.category || '');
    setEditTagInput('');
    setEditTags(task.tags || []);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = editTagInput.trim();
      if (tag && !editTags.includes(tag)) {
        setEditTags([...editTags, tag]);
        setEditTagInput('');
      }
    }
  };

  const removeEditTag = (tagToRemove: string) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return isDarkMode ? 'text-red-400 bg-red-900' : 'text-red-600 bg-red-50';
      case 'medium':
        return isDarkMode ? 'text-yellow-400 bg-yellow-900' : 'text-yellow-600 bg-yellow-50';
      case 'low':
        return isDarkMode ? 'text-green-400 bg-green-900' : 'text-green-600 bg-green-50';
      default:
        return isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-50';
    }
  };

  const isOverdue = task.dueDate && !task.completed && task.dueDate < new Date();
  const isDueSoon = task.dueDate && !task.completed && 
    task.dueDate > new Date() && 
    task.dueDate <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const categoryInfo = task.category ? getCategoryInfo(task.category) : null;

  return (
    <div className={`rounded-lg shadow-sm border p-4 transition-all duration-300 hover:shadow-md ${
      task.completed 
        ? isDarkMode ? 'opacity-75 bg-gray-800 border-gray-700' : 'opacity-75 bg-white border-gray-200'
        : isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } ${isOverdue ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : isDarkMode
                ? 'border-gray-500 hover:border-green-400'
                : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                rows={2}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>

                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />

                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">No Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  value={editTagInput}
                  onChange={(e) => setEditTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  placeholder="Add tags (press Enter or comma)"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                {editTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {editTags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-blue-900 text-blue-300' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        <Hash className="h-3 w-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeEditTag(tag)}
                          className="hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancel}
                  className={`p-1 rounded-md transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSave}
                  className={`p-1 rounded-md transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-green-400 hover:text-green-300 hover:bg-gray-700' 
                      : 'text-green-600 hover:text-green-700 hover:bg-gray-100'
                  }`}
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium transition-colors duration-300 ${
                      task.completed 
                        ? isDarkMode ? 'line-through text-gray-500' : 'line-through text-gray-500'
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    {isOverdue && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority || 'medium')}`}>
                      <Flag className="h-3 w-3 inline mr-1" />
                      {task.priority}
                    </span>
                    
                    {categoryInfo && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: categoryInfo.color }}
                        />
                        {categoryInfo.name}
                      </span>
                    )}
                    
                    {task.dueDate && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isOverdue 
                          ? 'bg-red-100 text-red-800' 
                          : isDueSoon 
                            ? 'bg-yellow-100 text-yellow-800'
                            : isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Calendar className="h-3 w-3" />
                        {formatDate(task.dueDate)}
                        {isOverdue && ' (Overdue)'}
                        {isDueSoon && ' (Due Soon)'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`p-1 rounded-md transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className={`p-1 rounded-md transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                        : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {task.description && (
                <p className={`text-sm mb-3 transition-colors duration-300 ${
                  task.completed 
                    ? isDarkMode ? 'line-through text-gray-500' : 'line-through text-gray-400'
                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
              
              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-blue-900 text-blue-300' 
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <Hash className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs">
                <div className={`flex items-center gap-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Created {formatDate(task.createdAt)}
                  </span>
                  {task.completedAt && (
                    <span className="flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Completed {formatDate(task.completedAt)}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg p-6 max-w-sm w-full transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Delete Task
            </h3>
            <p className={`mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};