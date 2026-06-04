import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://atmosfera-salon-beauty-api.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path
      },
      '/uploads': {
        target: 'https://atmosfera-salon-beauty-api.onrender.com',
        changeOrigin: true,
        secure: true
      }
    },
  },
  build: {
    outDir: 'build',
  },
});
