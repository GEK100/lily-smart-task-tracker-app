import React from 'react';
import { useDrop } from 'react-dnd';
import { vibrateLight } from '../utils/vibration';

const TimeSlot = ({ time, tasks, onDropTask, onTaskClick }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => {
      vibrateLight();
      onDropTask(item.task, time);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[40px] border-b border-gray-200 dark:border-gray-700 p-2 transition-colors ${
        isOver ? 'bg-primary-50 dark:bg-primary-900/20' : ''
      }`}
    >
      <div className="flex gap-2">
        <div className="w-16 flex-shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
          {time}
        </div>
        <div className="flex-1">
          {tasks.length === 0 && (
            <div className="h-full flex items-center">
              <div className="text-xs text-gray-400 dark:text-gray-600">
                Drop task here
              </div>
            </div>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskClick(task)}
              className="cursor-pointer"
            >
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
