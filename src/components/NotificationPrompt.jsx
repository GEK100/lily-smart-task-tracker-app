import React from 'react';
import { vibrateSuccess } from '../utils/vibration';

const NotificationPrompt = ({ onEnable, onSkip }) => {
  const handleEnable = () => {
    vibrateSuccess();
    onEnable();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl slide-up p-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Enable Notifications?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get reminded when your tasks are about to start. We'll send you a notification before each task.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleEnable}
            className="w-full btn-primary"
          >
            Enable Notifications
          </button>
          <button
            onClick={onSkip}
            className="w-full btn-secondary"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          You can change this later in your browser settings
        </p>
      </div>
    </div>
  );
};

export default NotificationPrompt;
