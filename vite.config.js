import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import notionToMdPlugin from './plugins/notionToMdPlugin'

// Pre build scripts
import './map-md-files';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // notionToMdPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
