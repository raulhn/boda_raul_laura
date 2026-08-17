import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { URL_BASE } from "./src/constantes";

// https://vite.dev/config/
export default defineConfig({
  base: URL_BASE,
  plugins: [react()],
});
