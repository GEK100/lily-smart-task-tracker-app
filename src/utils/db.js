import { openDB } from 'idb';

const DB_NAME = 'TaskTrackerDB';
const DB_VERSION = 1;

let db;

export async function initDB() {
  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Tasks store
      if (!db.objectStoreNames.contains('tasks')) {
        const taskStore = db.createObjectStore('tasks', {
          keyPath: 'id',
          autoIncrement: true,
        });
        taskStore.createIndex('date', 'date');
        taskStore.createIndex('categoryId', 'categoryId');
      }

      // Categories store
      if (!db.objectStoreNames.contains('categories')) {
        const categoryStore = db.createObjectStore('categories', {
          keyPath: 'id',
          autoIncrement: true,
        });
        categoryStore.createIndex('name', 'name');
      }

      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    },
  });

  // Initialize default categories
  const categoriesCount = await db.count('categories');
  if (categoriesCount === 0) {
    await initDefaultCategories();
  }

  return db;
}

async function initDefaultCategories() {
  const defaultCategories = [
    { name: 'School', color: '#3b82f6', icon: '📚' },
    { name: 'Homework', color: '#8b5cf6', icon: '✏️' },
    { name: 'Chores', color: '#10b981', icon: '🧹' },
    { name: 'Sports', color: '#f59e0b', icon: '⚽' },
    { name: 'Fun', color: '#ec4899', icon: '🎮' },
    { name: 'Reading', color: '#06b6d4', icon: '📖' },
    { name: 'Music', color: '#a855f7', icon: '🎵' },
    { name: 'Other', color: '#6b7280', icon: '📌' },
  ];

  const tx = db.transaction('categories', 'readwrite');
  for (const category of defaultCategories) {
    await tx.store.add(category);
  }
  await tx.done;
}

// Task operations
export async function addTask(task) {
  if (!db) await initDB();
  const id = await db.add('tasks', {
    ...task,
    createdAt: new Date().toISOString(),
    completed: false,
  });
  return { ...task, id };
}

export async function updateTask(id, updates) {
  if (!db) await initDB();
  const task = await db.get('tasks', id);
  const updatedTask = { ...task, ...updates };
  await db.put('tasks', updatedTask);
  return updatedTask;
}

export async function deleteTask(id) {
  if (!db) await initDB();
  await db.delete('tasks', id);
}

export async function getTasksByDate(date) {
  if (!db) await initDB();
  const allTasks = await db.getAllFromIndex('tasks', 'date', date);
  return allTasks;
}

export async function getAllTasks() {
  if (!db) await initDB();
  return await db.getAll('tasks');
}

// Category operations
export async function addCategory(category) {
  if (!db) await initDB();
  const id = await db.add('categories', category);
  return { ...category, id };
}

export async function updateCategory(id, updates) {
  if (!db) await initDB();
  const category = await db.get('categories', id);
  const updatedCategory = { ...category, ...updates };
  await db.put('categories', updatedCategory);
  return updatedCategory;
}

export async function deleteCategory(id) {
  if (!db) await initDB();
  await db.delete('categories', id);
}

export async function getAllCategories() {
  if (!db) await initDB();
  return await db.getAll('categories');
}

// Settings operations
export async function getSetting(key) {
  if (!db) await initDB();
  const setting = await db.get('settings', key);
  return setting?.value;
}

export async function setSetting(key, value) {
  if (!db) await initDB();
  await db.put('settings', { key, value });
}

// Export/Import for backup
export async function exportData() {
  if (!db) await initDB();
  const tasks = await db.getAll('tasks');
  const categories = await db.getAll('categories');
  const settings = await db.getAll('settings');
  return { tasks, categories, settings, exportDate: new Date().toISOString() };
}

export async function importData(data) {
  if (!db) await initDB();

  // Clear existing data
  await db.clear('tasks');
  await db.clear('categories');
  await db.clear('settings');

  // Import new data
  const tx = db.transaction(['tasks', 'categories', 'settings'], 'readwrite');

  for (const task of data.tasks || []) {
    await tx.objectStore('tasks').add(task);
  }

  for (const category of data.categories || []) {
    await tx.objectStore('categories').add(category);
  }

  for (const setting of data.settings || []) {
    await tx.objectStore('settings').add(setting);
  }

  await tx.done;
}
