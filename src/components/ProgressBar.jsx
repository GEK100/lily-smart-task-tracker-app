import React, { useMemo } from 'react';

const ProgressBar = ({ tasks }) => {
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter((t) => t.completed).length;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Daily Progress
        </h3>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
          {completedCount} / {totalCount}
        </span>
      </div>

      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
        </div>
      </div>

      <div className="mt-2 text-center">
        {progress === 100 ? (
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            🎉 All done! Great job!
          </span>
        ) : progress >= 50 ? (
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            🌟 You're doing great! Keep going!
          </span>
        ) : progress > 0 ? (
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            💪 Nice start! You've got this!
          </span>
        ) : (
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            ✨ Let's get started!
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
