import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: { ignored: ['**/.story-preview/**', '**/skills/**', '**/.cursor/**', '**/.agents/**'] },
  },
  build: {
    outDir: 'dist',
    // Three.js stays one lazy vendor chunk (~545 kB) loaded only by the home planet and 3D labs.
    // The interactive sims (simlib) ride in the lazy lesson-page chunk, so the home page never downloads them.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/learning/stories/')) return 'stories';
          return undefined;
        },
      },
    },
  },
});
