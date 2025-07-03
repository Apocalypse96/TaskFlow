import React from 'react';
import { LogOut, Search, User, Moon, Sun, Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../contexts/ThemeContext';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { FilterTabs } from './FilterTabs';
import { CategoryFilter } from './CategoryFilter';
import { CategoryManager } from './CategoryManager';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    tasks,
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
  } = useTasks();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  TaskFlow
                </h1>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Welcome back, {username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={onLogout}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <CategoryManager
              categories={categories}
              onAddCategory={addCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Task Form */}
            <TaskForm 
              onAddTask={addTask} 
              categories={categories}
            />

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks, descriptions, or tags..."
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <FilterTabs
                activeFilter={filter}
                onFilterChange={setFilter}
                taskCounts={taskCounts}
              />
            </div>

            {/* Task List */}
            <TaskList
              tasks={tasks}
              categories={categories}
              onUpdate={updateTask}
              onToggle={toggleTask}
              onDelete={deleteTask}
              filter={filter}
            />
          </div>
        </div>
      </main>
    </div>
  );
};