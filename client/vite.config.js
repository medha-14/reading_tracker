import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy all API calls from client to the backend on port 3001
      '/existinguser': 'http://localhost:3001',
      '/newuser': 'http://localhost:3001',
      '/allusers': 'http://localhost:3001',
    },
  },
})
