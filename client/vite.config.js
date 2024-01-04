import { defineConfig } from 'vite';

export default defineConfig({
  // Base URL for the application (if deploying to a subdirectory)
  base: '/',

  // Entry points for your application
  build: {
    rollupOptions: {
      input: {
        main: 'src/app.js',
      },
    },
  },

  // Development server configuration
 

  // Additional configurations...
});