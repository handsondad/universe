import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: { ignored: ['**/.story-preview/**', '**/skills/**', '**/.cursor/**', '**/.agents/**'] },
  },
  build: {
    outDir: 'dist',
    // Three.js stays one lazy vendor chunk (~545 kB) loaded only by the home planet and 3D labs.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/learning/stories/')) return 'stories';
          if (id.includes('/src/learning/simlib/')) return 'sims';
          return undefined;
        },
      },
    },
  },
});
