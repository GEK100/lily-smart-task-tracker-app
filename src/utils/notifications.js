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
export function scheduleNotification(task, taskDate, minutesBefore = 5) {
  if (Notification.permission !== 'granted') {
    return null;
  }

  // Parse task date and time properly
  const [hours, minutes] = task.startTime.split(':').map(Number);
  const taskDateTime = new Date(taskDate);
  taskDateTime.setHours(hours, minutes, 0, 0);

  const notificationTime = new Date(taskDateTime.getTime() - minutesBefore * 60000);
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

  // Play notification sound
  playNotificationSound();

  const notification = new Notification('🔔 Task Reminder', {
    body: `${task.title} starts soon!`,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: `task-${task.id}`,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
    silent: false,
    data: {
      taskId: task.id,
    },
  });

  // Vibrate on mobile devices
  if ('vibrate' in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }

  notification.onclick = function (event) {
    event.preventDefault();
    window.focus();
    notification.close();
  };

  // Auto-close after 30 seconds
  setTimeout(() => notification.close(), 30000);
}

// Play notification sound
function playNotificationSound() {
  // Create audio context for notification sound
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant notification tone
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    // Second tone
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);

      oscillator2.frequency.value = 1000;
      oscillator2.type = 'sine';

      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.5);
    }, 200);
  } catch (error) {
    console.log('Could not play notification sound:', error);
  }
}

// Cancel scheduled notification
export function cancelNotification(timeoutId) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

// Schedule all notifications for tasks on a given date
export function scheduleTaskNotifications(tasks, currentDate) {
  const scheduledNotifications = [];

  tasks.forEach((task) => {
    if (task.reminderEnabled && task.startTime && task.date) {
      const timeoutId = scheduleNotification(task, task.date, task.reminderMinutes || 5);
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
