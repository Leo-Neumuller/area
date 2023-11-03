import {defineConfig} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'

import path from 'path'

export default defineConfig({
  plugins: [svelte({hot: !process.env.VITEST})],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: [
      {find: "$app", replacement: path.resolve(__dirname, './__mocks__/app')},
    ]
  }
})