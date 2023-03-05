import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: [
      {
        /** Replace all imports @libs/ and @functions/ to ./src/libs/ and ./src/function */
        find: /@(libs|functions)\/(.*)/,
        replacement: './src/$1/$2',
      },
    ],
    globals: true,
    coverage: {
      include: ['**/handler.{js,ts}'],
      provider: 'c8',
    },
  },
});
