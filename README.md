# 📅 Lily Smart Task Tracker

A Progressive Web App (PWA) task tracker optimized for mobile devices, designed to help organize your day with drag-and-drop scheduling, color-coded categories, and smart notifications.

## ✨ Features

### Core Functionality
- **Day View with Time Slots**: View your day broken down into 5-minute increments
- **Drag-and-Drop Scheduling**: Easily schedule tasks by dragging them to time slots
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Color-Coded Categories**: 8 pre-defined categories (School, Homework, Chores, Sports, Fun, Reading, Music, Other)
- **Custom Categories**: Create your own categories with custom icons and colors
- **Visual Progress Tracking**: See your daily progress with an animated progress bar
- **Push Notifications**: Get reminded before tasks start (5, 10, 15, 30, or 60 minutes before)
- **Dark Mode**: Automatic dark mode support with manual toggle

### PWA Features
- **Offline Support**: Works without internet connection using IndexedDB
- **Installable**: Add to your phone's home screen like a native app
- **Service Worker**: Caches resources for fast loading
- **Touch-Optimized**: Large touch targets and smooth animations
- **Haptic Feedback**: Vibration feedback for interactions (on supported devices)

### Mobile-First Design
- **Responsive Layout**: Works on all phone sizes
- **Kid-Friendly Interface**: Clean, colorful, and easy to use
- **Smooth Animations**: Delightful interactions throughout
- **Accessibility**: High contrast and readable text

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Access the app**:
   - Open http://localhost:3000 in your browser
   - For mobile testing, use http://YOUR_IP:3000

### Building for Production

```bash
npm run build
```

The build will be in the `dist` folder. You can preview it with:

```bash
npm run preview
```

## 📱 Testing on Mobile Devices

### Option 1: Local Network Testing

1. **Start the dev server with network access**:
```bash
npm run dev
```

2. **Find your computer's IP address**:
   - Windows: Run `ipconfig` in Command Prompt
   - Mac/Linux: Run `ifconfig` or `ip addr`

3. **Access from your phone**:
   - Connect your phone to the same WiFi network
   - Open your phone's browser
   - Navigate to `http://YOUR_IP:3000`

### Option 2: Install as PWA

1. **Test in Chrome/Edge on mobile**:
   - Open the app in your mobile browser
   - Tap the menu (⋮) and select "Add to Home Screen" or "Install App"
   - The app will be added to your home screen

2. **Test PWA features**:
   - Close the browser
   - Open the app from your home screen
   - It should work offline and feel like a native app

### Testing Notifications

1. **Enable notifications**:
   - Open the app
   - Grant notification permission when prompted
   - Create a task with a reminder

2. **Test reminders**:
   - Set a task to start in 10 minutes
   - Set reminder to 5 minutes before
   - You should receive a notification 5 minutes before the task

### Testing Offline Mode

1. **Load the app online first**
2. **Enable airplane mode** on your device
3. **Open the app** - it should still work
4. **Create/edit tasks** - they'll be saved locally
5. **Disable airplane mode** - data persists

## 🎨 Customization

### Adding Custom Categories

1. Tap the tag icon (🏷️) in the bottom right
2. Scroll down to "Add New Category"
3. Enter a name, choose an icon and color
4. Tap "Add Category"

### Changing Time Range

Edit `src/components/DayView.jsx` line 15:
```javascript
const slots = generateTimeSlots(6, 22, 30); // Start hour, end hour, interval
```

### Changing Time Intervals

For 5-minute intervals, change the third parameter:
```javascript
const slots = generateTimeSlots(6, 22, 5); // 5-minute intervals
```

## 🏗️ Project Structure

```
lily-smart-task-tracker-app/
├── public/
│   ├── sw.js                    # Service worker
│   └── manifest.webmanifest     # PWA manifest
├── src/
│   ├── components/
│   │   ├── DayView.jsx          # Main day view with time slots
│   │   ├── TaskCard.jsx         # Individual task card
│   │   ├── TimeSlot.jsx         # Time slot component
│   │   ├── TaskForm.jsx         # Task creation/editing form
│   │   ├── ProgressBar.jsx      # Daily progress tracker
│   │   ├── Header.jsx           # App header with date navigation
│   │   └── CategoryManager.jsx  # Category management
│   ├── utils/
│   │   ├── db.js                # IndexedDB operations
│   │   ├── notifications.js     # Web Push API
│   │   ├── vibration.js         # Haptic feedback
│   │   └── timeUtils.js         # Time formatting utilities
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js               # Vite + PWA config
├── tailwind.config.js           # Tailwind CSS config
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React DnD**: Drag-and-drop functionality
- **IndexedDB (idb)**: Local data storage
- **Workbox**: Service worker and caching
- **Web Push API**: Push notifications
- **Vibration API**: Haptic feedback

## 📝 Usage Tips

### Creating Tasks
1. Tap the **+** button in the bottom right
2. Enter task details (name, category, time, duration, notes)
3. Enable reminders if desired
4. Tap "Create Task"

### Scheduling Tasks
- **Drag-and-drop**: Long-press a task and drag it to a time slot
- **Edit form**: Tap a task and select a start time from the dropdown

### Completing Tasks
- Tap the circle checkbox on any task to mark it complete
- Watch your progress bar increase!

### Managing Your Day
- Use the **arrows** in the header to navigate between days
- Tap **Today** to quickly return to today's view
- Unscheduled tasks appear at the top in a yellow section

### Dark Mode
- Tap the **sun/moon** icon in the header to toggle dark mode
- Your preference is saved automatically

## 🐛 Troubleshooting

### Notifications Not Working
- Check that notifications are enabled in your device settings
- Grant permission when the app requests it
- Notifications only work when the task is scheduled in the future

### Drag-and-Drop Not Working
- Ensure you're using a touch-enabled device or mouse
- Try a long-press (200ms) before dragging
- On desktop, use click-and-drag

### App Not Installing
- Use Chrome, Edge, or Safari (iOS)
- Ensure you're using HTTPS (required for PWA)
- Check that the manifest.webmanifest is loading correctly

### Data Not Persisting
- Check that IndexedDB is enabled in your browser
- Clear site data and reload if issues persist
- Data is stored locally per device

## 🔒 Privacy & Security

- **All data is stored locally** on your device using IndexedDB
- **No server or backend** - your data never leaves your device
- **No analytics or tracking**
- **No account required**

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

Potential features for future versions:
- Recurring tasks
- Multi-day task planning
- Data export/import
- Cloud sync (optional)
- Task templates
- Pomodoro timer integration
- Statistics and insights
- Calendar integration

---

Made with ❤️ for productive days!
