# 🍅 Pomodoro Timer - Simple Elegant Focus App

A modern, responsive Pomodoro Timer built with **SvelteKit** and **Tailwind CSS** featuring a clean, elegant design system optimized for productivity and focus.

## ✨ Features

### 🎯 **Core Timer Features**
- **Pomodoro Technique**: 25min Focus / 5min Short Break / 15min Long Break
- **Custom Timer**: Set your own focus duration
- **Fullscreen Mode**: Distraction-free timer experience
- **Keyboard Shortcuts**: Space/Enter (Start/Pause), R (Reset), F (Fullscreen)
- **Audio Notifications**: Gentle sound alerts when sessions complete
- **Desktop Notifications**: Browser notifications for session completion

### 📱 **Modern UI/UX**
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Dark/Light Mode**: Automatic theme switching
- **Internationalization**: English & Indonesian support
- **Elegant Animations**: Subtle, performance-optimized animations
- **Anti-Overflow**: Zero overflow issues across all screen sizes
- **Compact Layout**: Focus-optimized, space-efficient design

### 🎨 **Design System**
- **Simple Elegant**: Clean, minimal, sophisticated design
- **Glassmorphism**: Subtle backdrop blur effects
- **Gradient Backgrounds**: Elegant animated backgrounds
- **Consistent Spacing**: Standardized padding and margins
- **Typography Hierarchy**: Material Design 3 text system
- **Color System**: Semantic colors with proper contrast

### 📊 **Productivity Features**
- **Task Management**: Add, complete, and track tasks
- **Progress Tracking**: Visual progress indicators
- **Statistics**: Focus sessions, completion rates, streaks
- **Drag & Drop**: Reorder tasks with intuitive gestures
- **Session History**: Track your productivity patterns

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation
```bash
# Clone repository
git clone <repository-url>
cd pomodoro-timer

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:5173
```

### Build for Production
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage Guide

### Timer Controls
- **Start/Pause**: Click timer button or press `Space`/`Enter`
- **Reset**: Click reset button or press `R`
- **Fullscreen**: Click fullscreen button or press `F`
- **Mode Switch**: Click mode buttons or press `1`/`2`/`3`

### Task Management
- **Add Task**: Type in task input and press `Enter`
- **Complete Task**: Click checkbox to mark as done
- **Delete Task**: Click trash icon to remove task
- **Reorder Tasks**: Drag and drop to reorder

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` / `Enter` | Start/Pause Timer |
| `R` | Reset Timer |
| `F` | Toggle Fullscreen |
| `1` | Switch to Focus Mode |
| `2` | Switch to Short Break |
| `3` | Switch to Long Break |

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: SvelteKit (SSR + SPA)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **State Management**: Svelte Stores
- **Internationalization**: svelte-i18n
- **Build Tool**: Vite

### **Project Structure**
```
pomodoro-timer/
├── src/
│   ├── lib/
│   │   ├── components/          # UI Components
│   │   │   ├── Timer.svelte     # Main timer component
│   │   │   ├── TaskList.svelte  # Task management
│   │   │   ├── Stats.svelte     # Statistics display
│   │   │   ├── LanguageSwitcher.svelte
│   │   │   └── ThemeToggle.svelte
│   │   ├── stores/              # State management
│   │   │   ├── timer.ts         # Timer state
│   │   │   ├── tasks.ts         # Task state
│   │   │   └── stats.ts         # Statistics state
│   │   ├── i18n/                # Internationalization
│   │   │   └── locales/
│   │   │       ├── en.json
│   │   │       └── id.json
│   │   └── utils/               # Utility functions
│   ├── routes/                  # SvelteKit routes
│   │   └── +page.svelte         # Main app page
│   └── app.css                  # Global styles & design system
├── static/                      # Static assets
├── package.json
└── README.md
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--primary: #007AFF;           /* iOS Blue */
--success: #34C759;           /* iOS Green */
--warning: #FF9500;           /* iOS Orange */
--danger: #FF3B30;            /* iOS Red */

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

### **Component System**
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Consistent heights with hover effects
- **Inputs**: Standardized height with focus states
- **Progress**: Animated circular progress indicators

### **Typography**
- **Display**: 48px/56px/64px (Large/Medium/Small)
- **Headline**: 32px/28px/24px (Large/Medium/Small)
- **Title**: 22px/16px/14px (Large/Medium/Small)
- **Body**: 16px/14px (Large/Medium)
- **Label**: 14px/11px (Large/Small)

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Layout Strategy**
- **Mobile-First**: Optimized for mobile experience
- **Flexible Grids**: Responsive grid layouts
- **Touch-Friendly**: 44px minimum touch targets
- **Overflow Protection**: Zero horizontal overflow

## 🔧 Customization

### **Timer Durations**
Edit `src/lib/stores/timer.ts`:
```typescript
const DEFAULT_DURATIONS = {
  focus: 25 * 60,        // 25 minutes
  shortBreak: 5 * 60,    // 5 minutes
  longBreak: 15 * 60     // 15 minutes
};
```

### **Theme Colors**
Edit `src/app.css` CSS variables:
```css
:root {
  --primary: #007AFF;     /* Change primary color */
  --success: #34C759;     /* Change success color */
  --warning: #FF9500;     /* Change warning color */
  --danger: #FF3B30;      /* Change danger color */
}
```

### **Adding Languages**
1. Create new locale file: `src/lib/i18n/locales/[lang].json`
2. Add translations
3. Update `src/lib/i18n/index.ts`

## 🚀 Performance

### **Optimizations**
- **CSS Variables**: Efficient theme switching
- **Hardware Acceleration**: Transform-based animations
- **Lazy Loading**: Component-based code splitting
- **Minimal Bundle**: Tree-shaking and optimization
- **Efficient Re-renders**: Svelte's reactive system

### **Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 100KB gzipped

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Timer starts/pauses correctly
- [ ] Mode switching works
- [ ] Fullscreen mode functions
- [ ] Keyboard shortcuts work
- [ ] Task management works
- [ ] Statistics update correctly
- [ ] Responsive design on all devices
- [ ] Dark/light mode switching
- [ ] Language switching
- [ ] No overflow issues

### **Browser Support**
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📄 License

© 2024 **CodingGeh**. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

For support, email support@codinggeh.com or create an issue in the repository.

---

**Built with ❤️ by CodingGeh**
