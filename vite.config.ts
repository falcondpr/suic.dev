import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: ".", // Colocar la salida en la raíz
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"], // Generar tanto ESM como CommonJS
      name: "suic.dev",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`, // Generar index.mjs para ESM y index.js para CommonJS
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
