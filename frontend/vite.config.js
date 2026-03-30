import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // Any request that starts with /api will be forwarded to your Express server
      '/api': {
        target: 'http://localhost:5000',   // Your Express backend port
        changeOrigin: true,                // Makes the request look like it came from localhost:5000
        secure: false,                     // We're not using HTTPS in dev, so set to false
      }
    }
  }
})