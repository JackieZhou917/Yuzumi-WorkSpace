import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/klingai': {
        target: 'https://api-beijing.klingai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/klingai/, ''),
      },
    },
  },
})
