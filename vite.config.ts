// file: vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    // Ensures React Router handles navigation on Vercel
    historyApiFallback: true,
  },
})


