import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// FSD import layer rules (for developer reference):
//   app → pages → widgets → features → entities → shared
// Lower layers must never import from higher layers.
// Cross-feature imports are forbidden; use entities or shared instead.

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
