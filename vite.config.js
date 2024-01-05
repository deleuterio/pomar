import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import mdPlugin from 'vite-plugin-markdown';

// Pre build scripts
import './scripts/map-md-files';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  assetsInclude: ['content/posts/*.md', 'content/posts/*.png', 'content/posts/*.jpg'],
});
