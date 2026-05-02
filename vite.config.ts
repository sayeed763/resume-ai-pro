import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Prevents Vite from trying other ports
    hmr: {
      overlay: false // Disables the error overlay that triggers the classList error
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
