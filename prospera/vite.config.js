import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  },


    build: {
      rollupOptions: {
        external: ['react-icons'],
      },
    },


});