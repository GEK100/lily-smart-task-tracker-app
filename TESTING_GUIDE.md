# 📱 Mobile Testing Guide

Complete guide for testing the PWA Task Tracker on mobile devices.

## 🎯 Quick Start

### Step 1: Start the Development Server

```bash
# Install dependencies first
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 2: Access on Mobile

#### Method A: Same WiFi Network (Recommended)

1. **Find your computer's IP address**:

   **Windows**:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (usually starts with 192.168.x.x)

   **Mac/Linux**:
   ```bash
   ifconfig | grep "inet "
   # or
   ip addr show
   ```

2. **Connect your phone to the same WiFi**

3. **Open browser on your phone** and navigate to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

#### Method B: USB Debugging (Android)

1. **Enable USB debugging** on Android:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times to enable Developer Mode
   - Go to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect phone to computer via USB**

3. **Chrome DevTools**:
   - Open Chrome on your computer
   - Navigate to `chrome://inspect`
   - Your device should appear
   - Click "Inspect" and use port forwarding

4. **Port forward 3000**:
   - In DevTools, set up port forwarding: `3000` → `localhost:3000`
   - Access `localhost:3000` on your phone

## ✅ Testing Checklist

### Installation & PWA Features

- [ ] **Install Prompt**
  - Visit the app in Chrome/Edge
  - Look for "Add to Home Screen" or install icon in address bar
  - Tap to install
  - Icon appears on home screen

- [ ] **Launch from Home Screen**
  - Close browser completely
  - Tap app icon on home screen
  - App opens in standalone mode (no browser UI)

- [ ] **Offline Mode**
  - Open the app (loads online first)
  - Enable airplane mode
  - Navigate the app - should still work
  - Create/edit tasks - should save locally
  - Disable airplane mode - data persists

### Core Functionality

- [ ] **Create Task**
  - Tap the blue **+** button
  - Fill in task details
  - Select category
  - Choose time and duration
  - Save task

- [ ] **Edit Task**
  - Tap pencil icon on existing task
  - Modify details
  - Save changes
  - Verify changes appear

- [ ] **Delete Task**
  - Tap trash icon on task
  - Confirm deletion
  - Task disappears

- [ ] **Complete Task**
  - Tap checkbox circle on task
  - Checkmark appears
  - Progress bar updates
  - Task shows as completed (dimmed)

### Drag-and-Drop

- [ ] **Drag Unscheduled Task**
  - Create task without time
  - Long-press task card
  - Drag to a time slot
  - Drop - task moves to that time

- [ ] **Drag Scheduled Task**
  - Long-press scheduled task
  - Drag to different time slot
  - Drop - task reschedules

- [ ] **Haptic Feedback**
  - Feel vibration when dragging
  - Feel vibration when dropping
  - Different patterns for different actions

### Time Management

- [ ] **Navigate Days**
  - Tap left arrow - goes to yesterday
  - Tap right arrow - goes to tomorrow
  - Tap "Today" button - returns to today

- [ ] **Time Slots Display**
  - Scroll through time slots (6 AM - 10 PM)
  - Verify 30-minute intervals
  - Tasks appear at correct times

- [ ] **Task Duration**
  - Create task with 30-minute duration
  - Verify visual height matches duration
  - Create task with 60-minute duration
  - Verify height is larger

### Categories

- [ ] **Use Predefined Categories**
  - Create tasks with each category
  - Verify icons appear (📚, ✏️, 🧹, etc.)
  - Verify color coding on task border

- [ ] **Create Custom Category**
  - Tap tag icon (bottom right, smaller button)
  - Tap "Add New Category"
  - Enter name, select icon, select color
  - Save
  - Use in new task

- [ ] **Category Colors**
  - Verify each category has distinct color
  - Check color visibility in light mode
  - Check color visibility in dark mode

### Notifications

- [ ] **Grant Permission**
  - First time opening app, grant notification permission
  - Check system settings show permission granted

- [ ] **Schedule Notification**
  - Create task starting in 10 minutes
  - Enable reminder (5 minutes before)
  - Wait for notification
  - Verify notification appears with correct content

- [ ] **Notification Actions**
  - Tap notification
  - App opens to correct view
  - Notification dismisses

- [ ] **Multiple Reminders**
  - Create 3 tasks with different reminder times
  - Verify all notifications trigger correctly

### Dark Mode

- [ ] **Toggle Dark Mode**
  - Tap sun/moon icon in header
  - Interface switches to dark theme
  - Verify all colors are readable

- [ ] **Dark Mode Persistence**
  - Enable dark mode
  - Close app
  - Reopen app
  - Dark mode is still enabled

- [ ] **System Dark Mode**
  - Clear app data
  - Set phone to dark mode
  - Open app
  - App starts in dark mode

### Progress Tracking

- [ ] **Progress Bar Updates**
  - Create 4 tasks
  - Complete 0 tasks - verify 0%
  - Complete 1 task - verify 25%
  - Complete 2 tasks - verify 50%
  - Complete all tasks - verify 100%

- [ ] **Motivational Messages**
  - 0% complete: "Let's get started!"
  - >0% but <50%: "Nice start!"
  - ≥50% but <100%: "You're doing great!"
  - 100%: "All done! Great job!"

### Touch & Gestures

- [ ] **Touch Targets**
  - All buttons are easy to tap (44×44px minimum)
  - No accidental taps on adjacent elements
  - Comfortable for small hands

- [ ] **Scroll Smoothness**
  - Smooth scrolling through time slots
  - No lag or stuttering
  - Momentum scrolling works

- [ ] **Button Feedback**
  - Buttons scale down when pressed (active:scale-95)
  - Visual feedback on all interactions
  - Haptic feedback on key actions

- [ ] **Long Press**
  - Long press on task (200ms) to start drag
  - No context menu appears
  - Clean drag experience

### Visual & Animation

- [ ] **Animations Smooth**
  - Task form slides up smoothly
  - Category manager slides up smoothly
  - Progress bar animates
  - Task completion animations

- [ ] **Responsive Design**
  - Test on small phone (320px width)
  - Test on medium phone (375px width)
  - Test on large phone (414px width)
  - Test on tablet (768px+ width)

- [ ] **Text Readability**
  - All text is readable at normal size
  - Headers are clear and prominent
  - Icons are recognizable

### Edge Cases

- [ ] **No Tasks**
  - View with no tasks shows empty state
  - Progress bar shows 0/0

- [ ] **Many Tasks**
  - Create 20+ tasks
  - App performs well
  - Scrolling is smooth

- [ ] **Long Task Names**
  - Create task with very long title
  - Text truncates or wraps properly
  - UI doesn't break

- [ ] **Past Tasks**
  - Navigate to yesterday
  - Create task in the past
  - Works normally

- [ ] **Future Tasks**
  - Navigate to next week
  - Create task in future
  - Task saves correctly

### Browser Compatibility

Test on multiple browsers:

- [ ] **Chrome (Android)**
  - All features work
  - PWA install works
  - Notifications work

- [ ] **Safari (iOS)**
  - All features work
  - Add to Home Screen works
  - Notifications work (iOS 16.4+)

- [ ] **Firefox Mobile**
  - Basic functionality works
  - PWA features may be limited

- [ ] **Samsung Internet**
  - All features work
  - PWA install works

## 🐛 Common Issues & Fixes

### Issue: App won't load on mobile

**Fix**:
- Check firewall isn't blocking port 3000
- Ensure phone and computer are on same WiFi
- Try different IP address (some computers have multiple)
- Use `npm run serve` after `npm run build` for production testing

### Issue: Notifications not appearing

**Fix**:
- Check browser supports notifications (Chrome/Edge/Safari 16.4+)
- Verify notification permission granted in system settings
- Check task time is in the future
- Verify reminder is enabled on task

### Issue: Can't install as PWA

**Fix**:
- Use Chrome or Edge (best support)
- Ensure manifest.webmanifest is loading (check Network tab)
- Try incognito mode
- For iOS: Use Safari, tap Share → Add to Home Screen

### Issue: Drag-and-drop not working

**Fix**:
- Try longer press before dragging (200ms minimum)
- Check touch events aren't being blocked
- Test on different browser
- May need to disable browser gestures

### Issue: Data not saving

**Fix**:
- Check IndexedDB is enabled in browser settings
- Clear app data and try again
- Check browser console for errors
- Verify not in private/incognito mode

### Issue: Dark mode not working

**Fix**:
- Toggle manually (sun/moon icon)
- Check system dark mode setting
- Clear localStorage
- Check CSS variables are loading

## 📊 Performance Testing

### Lighthouse Audit

1. Build production version:
```bash
npm run build
npm run preview
```

2. Open Chrome DevTools
3. Go to Lighthouse tab
4. Run audit on mobile
5. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 90+
   - PWA: 100

### Network Testing

- [ ] **Fast 3G**: App loads in <5 seconds
- [ ] **Slow 3G**: App shows loading state, eventually loads
- [ ] **Offline**: App works completely offline after first load

## 🎥 Recording Testing Session

For bug reports or demonstrations:

1. **Screen Recording**:
   - iOS: Control Center → Screen Recording
   - Android: Notification Shade → Screen Record

2. **Chrome DevTools Remote Debugging**:
   - Connect phone via USB
   - Open chrome://inspect
   - Record interactions in DevTools

## ✨ Final Verification

Before considering testing complete:

- [ ] All checklist items passed
- [ ] Tested on at least 2 different devices
- [ ] Tested on at least 2 different browsers
- [ ] Offline mode works perfectly
- [ ] No console errors
- [ ] PWA installable and works from home screen
- [ ] Notifications working
- [ ] Performance acceptable (smooth, no lag)

---

**Happy Testing! 🚀**
