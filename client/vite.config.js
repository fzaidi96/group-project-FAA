import { defineConfig } from "vite";
import { resolve } from "path";


export default defineConfig({

// base: 'http://localhost:4173/',
  // Configure the build process
  build: {
    // Output directory for the built files
    outDir: "dist",

    // Set to true if you want to generate sourcemaps for production builds
    sourcemap: false,

    // Enable minification for production builds
    // minify: "terser",

    // Multi-page configuration
    rollupOptions: {
      input: {
        // Specify the entry points for each HTML page
        index: resolve(__dirname, "index.html"),
        userarea: resolve(__dirname, "userarea.html"),
        about: resolve(__dirname, "about.html"),
      },
    },
  },
});
