# 🚀 Deployment Guide

Complete guide to deploy the Pomodoro Timer to various platforms.

## 🌐 Netlify (Recommended)

### Automatic Deployment
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `Coding-Geh/podomoro-timer` repository

2. **Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18` (auto-detected from netlify.toml)

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Your site will be live at `https://your-site-name.netlify.app`

### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

## ⚡ Vercel

### Automatic Deployment
1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `Coding-Geh/podomoro-timer`

2. **Framework Preset**
   - Framework: **SvelteKit**
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy and provide a URL

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🐳 Docker

### Build Docker Image
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Deploy with Docker
```bash
# Build image
docker build -t pomodoro-timer .

# Run container
docker run -p 3000:3000 pomodoro-timer
```

## 📦 Static Hosting

### Build for Static Hosting
```bash
# Build the project
npm run build

# The 'build' folder contains all static files
# Upload to any static hosting service:
# - GitHub Pages
# - Firebase Hosting
# - AWS S3
# - Cloudflare Pages
```

### GitHub Pages
1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/docs` (create docs folder with build contents)

2. **Setup GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## 🔧 Environment Variables

### Optional Configuration
```env
# Timer durations (in minutes)
VITE_DEFAULT_FOCUS_TIME=25
VITE_DEFAULT_SHORT_BREAK=5
VITE_DEFAULT_LONG_BREAK=15

# App settings
VITE_APP_TITLE=Pomodoro Timer
VITE_APP_DESCRIPTION=Simple and elegant Pomodoro timer
```

### Netlify Environment Variables
1. Go to Site Settings > Environment Variables
2. Add variables as needed
3. Redeploy to apply changes

## 🚀 Performance Optimization

### Build Optimization
- **Tree Shaking**: Automatic with Vite
- **Code Splitting**: Automatic with SvelteKit
- **Asset Optimization**: Automatic compression
- **Caching**: Configured in netlify.toml

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 100KB gzipped

## 🔒 Security Headers

### Configured Headers (netlify.toml)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

## 📱 PWA Support

### Service Worker
- Automatic PWA generation with SvelteKit
- Offline support
- App-like experience

### Manifest
- Configured in `static/manifest.json`
- App icons and metadata
- Installable on mobile devices

## 🔍 SEO Optimization

### Meta Tags
- Dynamic title and description
- Open Graph tags
- Twitter Card support
- Structured data

### Sitemap
- Automatic sitemap generation
- Search engine optimization
- Social media sharing

## 📊 Analytics

### Google Analytics
```html
<!-- Add to app.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics
- Built-in analytics with Netlify
- No additional setup required
- Privacy-focused analytics

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Deployment Issues
- Check build logs in Netlify/Vercel
- Verify Node.js version (18+)
- Ensure all dependencies are installed

#### Performance Issues
- Check bundle size with `npm run build`
- Optimize images and assets
- Enable compression on hosting provider

### Support
- **GitHub Issues**: [Create Issue](https://github.com/Coding-Geh/podomoro-timer/issues)
- **Netlify Support**: [Netlify Docs](https://docs.netlify.com)
- **Vercel Support**: [Vercel Docs](https://vercel.com/docs)

---

## 🎯 Quick Deploy

### One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Coding-Geh/podomoro-timer)

### Manual Steps
1. Fork the repository
2. Connect to Netlify
3. Deploy automatically
4. Customize domain (optional)

---

**Happy Deploying! 🚀**
