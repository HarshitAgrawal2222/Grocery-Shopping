import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev: forward /api to the backend so cookies stay first-party
    proxy: {
      '/api': {
        target: 'https://purple-ntmp.vercel.app',
        changeOrigin: true,
      },
    },
  },
})