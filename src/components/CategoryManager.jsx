import React, { useState } from 'react';
import { vibrateSuccess } from '../utils/vibration';

const COLORS = [
  '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899',
  '#06b6d4', '#a855f7', '#6b7280', '#ef4444', '#14b8a6',
];

const ICONS = ['📚', '✏️', '🧹', '⚽', '🎮', '📖', '🎵', '📌', '🎨', '🏃', '🍎', '💻'];

const CategoryManager = ({ categories, onAddCategory, onClose }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState(ICONS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    vibrateSuccess();
    onAddCategory({ name, color, icon });
    setName('');
    setColor(COLORS[0]);
    setIcon(ICONS[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl slide-up max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Manage Categories
            </h2>
            <button
              onClick={onClose}
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

        <div className="p-4 space-y-6">
          {/* Existing Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Your Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
                    {cat.name}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Category */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Add New Category
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Math, Soccer Practice"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {ICONS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={`touch-target p-3 rounded-lg text-2xl ${
                        icon === ic
                          ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`touch-target w-full aspect-square rounded-lg ${
                        color === c ? 'ring-4 ring-offset-2 ring-primary-500' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    ></button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full btn-primary">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
