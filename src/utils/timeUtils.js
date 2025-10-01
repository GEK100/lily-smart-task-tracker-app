// Time utility functions

export function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function formatDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

export function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateTimeSlots(startHour = 6, endHour = 22, interval = 5) {
  const slots = [];
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  for (let minutes = startMinutes; minutes < endMinutes; minutes += interval) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const date = new Date();
    date.setHours(hours, mins, 0, 0);

    slots.push({
      time: formatTime(date),
      value: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
      minutes: minutes,
    });
  }

  return slots;
}

export function calculateDuration(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  const diff = end - start;
  const minutes = Math.floor(diff / 60000);
  return minutes;
}

export function getTimeFromMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function getMinutesFromTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function getTodayString() {
  return getDateString(new Date());
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
