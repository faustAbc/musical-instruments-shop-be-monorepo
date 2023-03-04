import { defineConfig } from 'vite';
import content from '@originjs/vite-plugin-content';

export default defineConfig({
  plugins: [
    content(),
    /* options */
  ],
  root: './docs',
  build: {
    outDir: '../docs-dist',
    emptyOutDir:true,
    // manifest: true,
    // rollupOptions: {
    // overwrite default .html entry
    // input: '/index.html',
    // },
  },
});
