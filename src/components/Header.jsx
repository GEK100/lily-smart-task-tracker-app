import React from 'react';
import { formatDate, addDays } from '../utils/timeUtils';

const Header = ({ currentDate, onDateChange, onToggleDarkMode, isDarkMode }) => {
  const goToPreviousDay = () => {
    onDateChange(addDays(currentDate, -1));
  };

  const goToNextDay = () => {
    onDateChange(addDays(currentDate, 1));
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">📅 My Tasks</h1>
          <button
            onClick={onToggleDarkMode}
            className="touch-target p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={goToPreviousDay}
            className="touch-target p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
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
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
          </div>

          <button
            onClick={goToNextDay}
            className="touch-target p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
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
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <button
          onClick={goToToday}
          className="mt-2 w-full py-2 text-sm font-semibold rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
        >
          Today
        </button>
      </div>
    </header>
  );
};

export default Header;
