import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ['svelte-hero-icons'],
  },
  server :{
    port:5000
  }
})
