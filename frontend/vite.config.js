import { defineConfig } from 'vite'

export default defineConfig({
  // ... other config
  server: {
    watch: {
      usePolling: true
    },
    host: true // needed for docker
  }
})
