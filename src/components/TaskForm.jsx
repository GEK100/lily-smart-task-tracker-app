import React, { useState, useEffect } from 'react';
import { vibrateSuccess, vibrateError } from '../utils/vibration';
import { generateTimeSlots } from '../utils/timeUtils';

const TaskForm = ({ task, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    startTime: '',
    duration: 30,
    reminderEnabled: true,
    reminderMinutes: 5,
  });

  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const slots = generateTimeSlots(6, 22, 5); // 5-minute increments
    setTimeSlots(slots);
  }, []);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        categoryId: task.categoryId || '',
        startTime: task.startTime || '',
        duration: task.duration || 30,
        reminderEnabled: task.reminderEnabled !== false,
        reminderMinutes: task.reminderMinutes || 5,
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      vibrateError();
      return;
    }
    vibrateSuccess();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl slide-up max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {task ? 'Edit Task' : 'New Task'}
            </h2>
            <button
              onClick={onCancel}
              className="touch-target p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Task Name *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleChange('categoryId', cat.id)}
                  className={`touch-target p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                    formData.categoryId === cat.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium truncate w-full text-center">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Start Time
            </label>
            <select
              value={formData.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
            >
              <option value="">Not scheduled</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.time}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Duration: {formData.duration} minutes
            </label>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5 min</span>
              <span>180 min</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add any details..."
              rows="3"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none resize-none"
            />
          </div>

          {/* Reminder */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.reminderEnabled}
                onChange={(e) => handleChange('reminderEnabled', e.target.checked)}
                className="w-6 h-6 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Remind me before task
              </span>
            </label>

            {formData.reminderEnabled && (
              <select
                value={formData.reminderMinutes}
                onChange={(e) => handleChange('reminderMinutes', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
              >
                <option value="5">5 minutes before</option>
                <option value="10">10 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
              </select>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {task ? 'Update' : 'Create'} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
