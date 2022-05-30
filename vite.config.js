import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return defineConfig({
    plugins: [react()],
    test: {
      globals: true
    }
  })
})
