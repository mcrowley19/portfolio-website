import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Pulls the Google Fonts stylesheet at build time, downloads the
    // referenced woff2 files into /assets (so they inherit the immutable
    // Cache-Control rule), and rewrites index.html to a non-render-blocking
    // self-hosted @font-face declaration. Eliminates the fonts.googleapis.com
    // and fonts.gstatic.com round trips.
    webfontDownload(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react-router')) return 'router'
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react'
          }
        },
      },
    },
  },
})
