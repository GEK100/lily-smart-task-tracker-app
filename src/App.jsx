import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DayView from './components/DayView';
import TaskForm from './components/TaskForm';
import ProgressBar from './components/ProgressBar';
import CategoryManager from './components/CategoryManager';
import {
  initDB,
  addTask,
  updateTask,
  deleteTask,
  getTasksByDate,
  getAllCategories,
  addCategory,
  getSetting,
  setSetting,
} from './utils/db';
import { getDateString } from './utils/timeUtils';
import {
  requestNotificationPermission,
  scheduleTaskNotifications,
  isNotificationSupported,
} from './utils/notifications';
import { vibrateLight, vibrateDelete } from './utils/vibration';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationSchedules, setNotificationSchedules] = useState([]);

  // Initialize app
  useEffect(() => {
    initializeApp();
  }, []);

  // Load dark mode preference
  useEffect(() => {
    const loadDarkMode = async () => {
      const darkModePreference = await getSetting('darkMode');
      if (darkModePreference !== undefined) {
        setIsDarkMode(darkModePreference);
        updateDarkModeClass(darkModePreference);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        updateDarkModeClass(prefersDark);
      }
    };
    loadDarkMode();
  }, []);

  // Load tasks when date changes
  useEffect(() => {
    loadTasks();
  }, [currentDate]);

  // Schedule notifications when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const schedules = scheduleTaskNotifications(tasks);
      setNotificationSchedules(schedules);
    }
  }, [tasks]);

  const initializeApp = async () => {
    await initDB();
    await loadCategories();
    await loadTasks();

    // Request notification permission
    if (isNotificationSupported()) {
      await requestNotificationPermission();
    }
  };

  const loadCategories = async () => {
    const cats = await getAllCategories();
    setCategories(cats);
  };

  const loadTasks = async () => {
    const dateStr = getDateString(currentDate);
    const tasksForDate = await getTasksByDate(dateStr);
    setTasks(tasksForDate);
  };

  const handleAddTask = async (taskData) => {
    vibrateLight();
    const dateStr = getDateString(currentDate);
    await addTask({ ...taskData, date: dateStr });
    await loadTasks();
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleUpdateTask = async (taskId, updates) => {
    vibrateLight();
    await updateTask(taskId, updates);
    await loadTasks();
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('Delete this task?')) {
      vibrateDelete();
      await deleteTask(taskId);
      await loadTasks();
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = async (taskData) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, taskData);
    } else {
      await handleAddTask(taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleAddCategory = async (categoryData) => {
    vibrateLight();
    await addCategory(categoryData);
    await loadCategories();
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    updateDarkModeClass(newMode);
    await setSetting('darkMode', newMode);
  };

  const updateDarkModeClass = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />

      <ProgressBar tasks={tasks} />

      <main className="flex-1 overflow-hidden">
        <DayView
          tasks={tasks}
          categories={categories}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
        <button
          onClick={() => setShowCategoryManager(true)}
          className="w-14 h-14 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
        </button>

        <button
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          className="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>

      {/* Modals */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          categories={categories}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </div>
  );
}

export default App;
