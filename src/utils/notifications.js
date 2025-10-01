// Request notification permission
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Schedule a notification
export function scheduleNotification(task, minutesBefore = 5) {
  if (Notification.permission !== 'granted') {
    return null;
  }

  const taskTime = new Date(task.startTime);
  const notificationTime = new Date(taskTime.getTime() - minutesBefore * 60000);
  const now = new Date();

  if (notificationTime <= now) {
    return null;
  }

  const timeUntilNotification = notificationTime.getTime() - now.getTime();

  const timeoutId = setTimeout(() => {
    showNotification(task);
  }, timeUntilNotification);

  return timeoutId;
}

// Show notification
export function showNotification(task) {
  if (Notification.permission !== 'granted') {
    return;
  }

  const notification = new Notification('Task Reminder', {
    body: `${task.title} starts soon!`,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: `task-${task.id}`,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: {
      taskId: task.id,
    },
  });

  // Vibrate on mobile devices
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  notification.onclick = function (event) {
    event.preventDefault();
    window.focus();
    notification.close();
  };

  // Auto-close after 10 seconds
  setTimeout(() => notification.close(), 10000);
}

// Cancel scheduled notification
export function cancelNotification(timeoutId) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

// Schedule all notifications for tasks on a given date
export function scheduleTaskNotifications(tasks) {
  const scheduledNotifications = [];

  tasks.forEach((task) => {
    if (task.reminderEnabled && task.startTime) {
      const timeoutId = scheduleNotification(task, task.reminderMinutes || 5);
      if (timeoutId) {
        scheduledNotifications.push({
          taskId: task.id,
          timeoutId,
        });
      }
    }
  });

  return scheduledNotifications;
}

// Check if notifications are supported
export function isNotificationSupported() {
  return 'Notification' in window;
}

// Get notification permission status
export function getNotificationPermission() {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
}
