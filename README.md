# 🍅 Pomodoro Timer

A **simple, elegant, and responsive** Pomodoro timer built with **SvelteKit** and **Tailwind CSS**. Perfect for boosting productivity with beautiful design and powerful features.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Coding-Geh/podomoro-timer)

![Pomodoro Timer](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🎯 **Timer Features**
- **Three Timer Modes**: Focus (25 min), Short Break (5 min), Long Break (15 min)
- **Custom Timer**: Set custom minutes and seconds
- **Fullscreen Mode**: Distraction-free timer experience
- **Keyboard Shortcuts**: Complete keyboard navigation
- **Progress Circle**: Visual progress indicator
- **Responsive Design**: Works perfectly on all devices

### 📋 **Task Management**
- **Add Tasks**: Quick task creation with keyboard shortcuts
- **Drag & Drop**: Reorder tasks easily
- **Task Completion**: Mark tasks as complete/incomplete
- **Task Statistics**: Track completion rates
- **Persistent Storage**: Tasks saved locally

### 📊 **Statistics & Progress**
- **Session Tracking**: Count completed Pomodoro sessions
- **Focus Hours**: Track total focus time
- **Task Progress**: Monitor task completion
- **Completion Rate**: Visual progress indicators
- **Daily Summary**: Overview of daily productivity

### 🎨 **UI/UX Features**
- **Dark/Light Mode**: Automatic theme switching
- **Internationalization**: English and Indonesian support
- **Elegant Design**: Modern, clean interface
- **Smooth Animations**: Beautiful transitions and effects
- **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 **Keyboard Shortcuts**

| Action | Shortcut |
|--------|----------|
| Start/Pause Timer | `Space` or `Enter` |
| Reset Timer | `R` |
| Toggle Fullscreen | `F` |
| Focus Mode | `1` |
| Short Break | `2` |
| Long Break | `3` |
| New Task Input | `N` |
| Exit Fullscreen | `Esc` |

## 🛠️ **Tech Stack**

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Full-stack web framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Internationalization**: [svelte-i18n](https://github.com/kaisermann/svelte-i18n) - Multi-language support
- **State Management**: Svelte stores for reactive state
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and dev server

## 📦 **Installation**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/Coding-Geh/podomoro-timer.git
cd podomoro-timer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 **Deployment**

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

### Vercel
1. Import project from GitHub
2. Framework preset: SvelteKit
3. Deploy automatically

### Manual Deployment
```bash
npm run build
# Upload the 'build' folder to your hosting provider
```

## 🎨 **Design System**

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale with dark mode support

### Typography
- **Font**: System fonts with fallbacks
- **Hierarchy**: Material Design 3 typography scale
- **Responsive**: Scales appropriately on all devices

### Components
- **Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Consistent styling with hover states
- **Inputs**: Clean, minimal design
- **Animations**: Smooth transitions and micro-interactions

## 📱 **Responsive Design**

- **Mobile**: Optimized for touch interactions
- **Tablet**: Adaptive layout with sidebar
- **Desktop**: Full-featured experience
- **Fullscreen**: Immersive timer mode

## 🔧 **Configuration**

### Environment Variables
```env
# Optional: Customize default settings
VITE_DEFAULT_FOCUS_TIME=25
VITE_DEFAULT_SHORT_BREAK=5
VITE_DEFAULT_LONG_BREAK=15
```

### Customization
- Modify timer durations in `src/lib/stores/timer.ts`
- Update colors in `src/app.css`
- Add new languages in `src/lib/i18n/locales/`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Pomodoro Technique**: Francesco Cirillo for the productivity method
- **SvelteKit Team**: Amazing framework and documentation
- **Tailwind CSS**: Beautiful utility-first CSS framework
- **Open Source Community**: For inspiration and tools

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/Coding-Geh/podomoro-timer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Coding-Geh/podomoro-timer/discussions)
- **Email**: [Contact via GitHub](https://github.com/Coding-Geh)

---

<div align="center">

**Stay focused, stay productive! 🍅**

Made with ❤️ by [CodingGeh](https://github.com/Coding-Geh)

[![GitHub stars](https://img.shields.io/github/stars/Coding-Geh/podomoro-timer?style=social)](https://github.com/Coding-Geh/podomoro-timer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Coding-Geh/podomoro-timer?style=social)](https://github.com/Coding-Geh/podomoro-timer/network/members)

</div>
