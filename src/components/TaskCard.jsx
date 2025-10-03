import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { vibrateMedium, vibrateComplete } from '../utils/vibration';

const TaskCard = ({ task, category, onEdit, onDelete, onToggleComplete }) => {
  const [showRedFlag, setShowRedFlag] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        vibrateMedium();
      }
    },
  }));

  // Check if notification time is approaching
  useEffect(() => {
    if (!task.reminderEnabled || !task.startTime || !task.date) {
      setShowRedFlag(false);
      return;
    }

    const checkNotificationTime = () => {
      const now = new Date();
      const [hours, minutes] = task.startTime.split(':').map(Number);
      const taskDateTime = new Date(task.date);
      taskDateTime.setHours(hours, minutes, 0, 0);

      const reminderMinutes = task.reminderMinutes || 5;
      const notificationTime = new Date(taskDateTime.getTime() - reminderMinutes * 60000);

      // Show red flag if we're within the notification window (from reminder time to task time)
      setShowRedFlag(now >= notificationTime && now < taskDateTime);
    };

    checkNotificationTime();
    const interval = setInterval(checkNotificationTime, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [task.reminderEnabled, task.startTime, task.date, task.reminderMinutes]);

  const handleToggleComplete = () => {
    vibrateComplete();
    onToggleComplete(task.id);
  };

  const duration = task.duration || 30;
  const height = (duration / 5) * 16; // 16px per 5 minutes

  return (
    <div
      ref={drag}
      className={`card p-3 mb-2 border-l-4 cursor-move touch-manipulation ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${task.completed ? 'opacity-60' : ''}`}
      style={{
        borderLeftColor: category?.color || '#6b7280',
        minHeight: `${height}px`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <button
            onClick={handleToggleComplete}
            className="mt-0.5 flex-shrink-0 touch-target flex items-center justify-center"
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {task.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg">{category?.icon || '📌'}</span>
              <h3
                className={`font-semibold text-gray-900 dark:text-gray-100 ${
                  task.completed ? 'line-through' : ''
                }`}
              >
                {task.title}
              </h3>
              {showRedFlag && !task.completed && (
                <span className="text-xl animate-bounce-gentle" title="Notification time!">
                  🚩
                </span>
              )}
            </div>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>⏰ {task.startTime}</span>
              <span>⏱️ {duration} min</span>
              {task.reminderEnabled && <span>🔔</span>}
              {showRedFlag && !task.completed && (
                <span className="text-red-600 dark:text-red-400 font-semibold animate-pulse">
                  DUE SOON!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="touch-target p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg active:scale-95 transition-transform"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="touch-target p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg active:scale-95 transition-transform"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
