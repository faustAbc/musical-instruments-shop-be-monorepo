import { defineConfig } from 'vite';
import content from '@originjs/vite-plugin-content';

export default defineConfig({
  plugins: [content()],
  root: './docs',
  build: {
    outDir: '../docs-dist',
    emptyOutDir: true,
  },
});
