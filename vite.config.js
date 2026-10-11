import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// FSD: все импорты идут через алиас `@` → `src`, чтобы слои можно было
// переносить и переименовывать без переписывания относительных путей.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { port: 5173, open: false },
  build: { outDir: 'dist', sourcemap: true },
});
