import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MultilanguageJS',
      formats: ['es', 'umd'],
      fileName: (format) => `multilanguagejs.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    coverage: {
      include: ['src/**'],
    },
  },
})
