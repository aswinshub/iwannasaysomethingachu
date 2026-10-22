# 💌 A Little Surprise for You

A beautiful, romantic, interactive personal website built with React, TypeScript, Tailwind CSS, and Framer Motion — designed to share with someone you love.

## ✨ Features

- **Screen 1 — Landing Page**: Dreamy blush-pink design with an animated portrait frame, floating hearts, and a glowing "Open My Heart ❤️" button.
- **Screen 2 — Romantic Surprise**: A cinematic reveal with a Polaroid-style couple photo, a heartfelt line-by-line animated message, heartbeat effects, and a replay button.
- **Photo Setup Panel**: A discreet setup panel (bottom-right button) to upload your photos privately — all images stay in the browser, no server upload.
- **Responsive**: Fully mobile-first, works beautifully on all screen sizes.
- **Accessible**: Keyboard navigation, focus states, reduced-motion support.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Deployment

```bash
npm run build
```

The production build will be in the `dist/` folder. You can deploy this to:
- **Vercel**: `npx vercel deploy`
- **Netlify**: Drag & drop the `dist/` folder to [app.netlify.com](https://app.netlify.com)
- **GitHub Pages**: Use the `gh-pages` package
- **Any static host**: Upload the `dist/` folder

## 📸 How to Add Photos

1. Open the website in your browser
2. Click the **"Setup Photos"** button in the bottom-right corner
3. Upload **her portrait photo** (for the landing page)
4. Upload **your couple photo** (for the surprise screen)
5. Close the setup panel and share the link!

> **Privacy**: All uploaded images are stored only in browser memory (object URLs). They are never sent to any server and will be cleared when the tab is closed.

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations & transitions |
| Lucide React | Icons |
| Vite | Build tool |

## 📁 Project Structure

```
src/
├── components/
│   ├── LandingScreen.tsx    # Screen 1 — Her photo + button
│   ├── SurpriseScreen.tsx   # Screen 2 — Couple photo + message
│   ├── FloatingParticles.tsx  # Floating hearts & sparkles
│   ├── ImageUploader.tsx    # Drag-and-drop image uploader
│   └── SetupPanel.tsx       # Discreet photo setup panel
├── App.tsx                  # Root component & state management
├── main.tsx                 # React entry point
└── index.css                # Global styles & design tokens
index.html                   # HTML entry point
```

## 💝 Made with Love

*"Missing you today, tomorrow, and all the days in between."*
