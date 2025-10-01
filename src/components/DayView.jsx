import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import TaskCard from './TaskCard';
import TimeSlot from './TimeSlot';
import { generateTimeSlots, getMinutesFromTime } from '../utils/timeUtils';
import { vibrateLight } from '../utils/vibration';

const DayView = ({ tasks, categories, onUpdateTask, onDeleteTask, onEditTask }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    const slots = generateTimeSlots(6, 22, 30); // 6 AM to 10 PM, 30-min intervals
    setTimeSlots(slots);
  }, []);

  useEffect(() => {
    // Group tasks by time slot
    const grouped = {};
    tasks.forEach((task) => {
      if (task.startTime) {
        const taskMinutes = getMinutesFromTime(task.startTime);
        // Find nearest 30-min slot
        const slotIndex = Math.floor((taskMinutes - 360) / 30); // 360 = 6 AM in minutes
        const slotKey = slotIndex;
        if (!grouped[slotKey]) {
          grouped[slotKey] = [];
        }
        grouped[slotKey].push(task);
      }
    });
    setGroupedTasks(grouped);
  }, [tasks]);

  const handleDropTask = async (task, timeSlot) => {
    vibrateLight();
    await onUpdateTask(task.id, {
      startTime: timeSlot.value,
    });
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    await onUpdateTask(taskId, {
      completed: !task.completed,
    });
  };

  return (
    <DndProvider
      backend={TouchBackend}
      options={{
        enableMouseEvents: true,
        delayTouchStart: 200,
        ignoreContextMenu: true,
      }}
    >
      <div className="h-full overflow-auto smooth-scroll pb-20">
        {/* Unscheduled tasks */}
        {tasks.filter((t) => !t.startTime).length > 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
            <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center gap-2">
              <span>📋</span>
              Unscheduled Tasks
            </h3>
            <div className="space-y-2">
              {tasks
                .filter((t) => !t.startTime)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    category={categories.find((c) => c.id === task.categoryId)}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Time slots */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {timeSlots.map((slot, index) => (
            <div key={slot.value} className="relative">
              <TimeSlot
                time={slot.time}
                tasks={[]}
                onDropTask={handleDropTask}
                onTaskClick={onEditTask}
              />
              {/* Render tasks in this time slot */}
              {groupedTasks[index] && (
                <div className="ml-20 -mt-2 space-y-2 mb-2">
                  {groupedTasks[index].map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      category={categories.find((c) => c.id === task.categoryId)}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DayView;
