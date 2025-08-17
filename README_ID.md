# 🍅 Pomodoro Timer

Timer **Pomodoro sederhana, elegan, dan responsif** yang dibangun dengan **SvelteKit** dan **Tailwind CSS**. Sempurna untuk meningkatkan produktivitas dengan desain yang indah dan fitur yang powerful.

![Pomodoro Timer](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Fitur

### 🎯 **Fitur Timer**
- **Tiga Mode Timer**: Fokus (25 menit), Istirahat Pendek (5 menit), Istirahat Panjang (15 menit)
- **Timer Kustom**: Atur menit dan detik sesuai kebutuhan
- **Mode Layar Penuh**: Pengalaman timer bebas gangguan
- **Shortcut Keyboard**: Navigasi keyboard lengkap
- **Lingkaran Progress**: Indikator progress visual
- **Desain Responsif**: Berfungsi sempurna di semua perangkat

### 📋 **Manajemen Tugas**
- **Tambah Tugas**: Pembuatan tugas cepat dengan shortcut keyboard
- **Drag & Drop**: Susun ulang tugas dengan mudah
- **Penyelesaian Tugas**: Tandai tugas sebagai selesai/belum selesai
- **Statistik Tugas**: Lacak tingkat penyelesaian
- **Penyimpanan Persisten**: Tugas disimpan secara lokal

### 📊 **Statistik & Progress**
- **Pelacakan Sesi**: Hitung sesi Pomodoro yang selesai
- **Jam Fokus**: Lacak total waktu fokus
- **Progress Tugas**: Pantau penyelesaian tugas
- **Tingkat Penyelesaian**: Indikator progress visual
- **Ringkasan Harian**: Ikhtisar produktivitas harian

### 🎨 **Fitur UI/UX**
- **Mode Gelap/Terang**: Pergantian tema otomatis
- **Internasionalisasi**: Dukungan bahasa Inggris dan Indonesia
- **Desain Elegan**: Antarmuka modern dan bersih
- **Animasi Halus**: Transisi dan efek yang indah
- **Aksesibilitas**: Navigasi keyboard lengkap dan dukungan screen reader

## 🚀 **Shortcut Keyboard**

| Aksi | Shortcut |
|------|----------|
| Mulai/Jeda Timer | `Space` atau `Enter` |
| Reset Timer | `R` |
| Toggle Layar Penuh | `F` |
| Mode Fokus | `1` |
| Istirahat Pendek | `2` |
| Istirahat Panjang | `3` |
| Input Tugas Baru | `N` |
| Keluar Layar Penuh | `Esc` |

## 🛠️ **Tech Stack**

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - Framework web full-stack
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan type safety
- **Internasionalisasi**: [svelte-i18n](https://github.com/kaisermann/svelte-i18n) - Dukungan multi-bahasa
- **State Management**: Svelte stores untuk state reaktif
- **Build Tool**: [Vite](https://vitejs.dev/) - Build tool dan dev server yang cepat

## 📦 **Instalasi**

### Prasyarat
- Node.js 18+ 
- npm atau yarn

### Setup
```bash
# Clone repository
git clone https://github.com/Coding-Geh/podomoro-timer.git
cd podomoro-timer

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview build production
npm run preview
```

## 🌐 **Deployment**

### Netlify (Direkomendasikan)
1. Hubungkan repository GitHub ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy otomatis saat push ke branch main

### Vercel
1. Import project dari GitHub
2. Framework preset: SvelteKit
3. Deploy otomatis

### Deployment Manual
```bash
npm run build
# Upload folder 'build' ke hosting provider
```

## 🎨 **Sistem Desain**

### Palet Warna
- **Primary**: Biru (#3B82F6)
- **Success**: Hijau (#10B981)
- **Warning**: Kuning (#F59E0B)
- **Error**: Merah (#EF4444)
- **Neutral**: Skala abu-abu dengan dukungan mode gelap

### Tipografi
- **Font**: System fonts dengan fallbacks
- **Hierarki**: Skala tipografi Material Design 3
- **Responsif**: Skala yang sesuai di semua perangkat

### Komponen
- **Cards**: Efek glassmorphism dengan backdrop blur
- **Buttons**: Styling konsisten dengan hover states
- **Inputs**: Desain bersih dan minimal
- **Animations**: Transisi halus dan micro-interactions

## 📱 **Desain Responsif**

- **Mobile**: Dioptimalkan untuk interaksi sentuh
- **Tablet**: Layout adaptif dengan sidebar
- **Desktop**: Pengalaman full-featured
- **Layar Penuh**: Mode timer yang imersif

## 🔧 **Konfigurasi**

### Environment Variables
```env
# Opsional: Kustomisasi pengaturan default
VITE_DEFAULT_FOCUS_TIME=25
VITE_DEFAULT_SHORT_BREAK=5
VITE_DEFAULT_LONG_BREAK=15
```

### Kustomisasi
- Modifikasi durasi timer di `src/lib/stores/timer.ts`
- Update warna di `src/app.css`
- Tambah bahasa baru di `src/lib/i18n/locales/`

## 🤝 **Kontribusi**

1. Fork repository
2. Buat feature branch (`git checkout -b feature/fitur-menakjubkan`)
3. Commit perubahan (`git commit -m 'Tambah fitur menakjubkan'`)
4. Push ke branch (`git push origin feature/fitur-menakjubkan`)
5. Buka Pull Request

## 📄 **Lisensi**

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 **Ucapan Terima Kasih**

- **Teknik Pomodoro**: Francesco Cirillo untuk metode produktivitas
- **Tim SvelteKit**: Framework dan dokumentasi yang luar biasa
- **Tailwind CSS**: Framework CSS utility-first yang indah
- **Komunitas Open Source**: Untuk inspirasi dan tools

## 📞 **Dukungan**

- **Issues**: [GitHub Issues](https://github.com/Coding-Geh/podomoro-timer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Coding-Geh/podomoro-timer/discussions)
- **Email**: [Hubungi via GitHub](https://github.com/Coding-Geh)

---

<div align="center">

**Tetap fokus, tetap produktif! 🍅**

Dibuat dengan ❤️ oleh [CodingGeh](https://github.com/Coding-Geh)

[![GitHub stars](https://img.shields.io/github/stars/Coding-Geh/podomoro-timer?style=social)](https://github.com/Coding-Geh/podomoro-timer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Coding-Geh/podomoro-timer?style=social)](https://github.com/Coding-Geh/podomoro-timer/network/members)

</div>
