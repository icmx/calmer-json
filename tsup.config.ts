import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  dts: true,
  minify: true,
});
