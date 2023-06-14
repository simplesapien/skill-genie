import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default defineConfig({
  plugins: [react()],
  root: "frontend/src/",
  publicDir: "../public/",
  base: "./",
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
