import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['__tests__/setup.ts'],
    alias: {
      '@': path.resolve(__dirname)
    }
  }
}) 

