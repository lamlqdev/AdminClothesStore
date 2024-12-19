import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Sử dụng các API như "describe", "it" mà không cần import
    environment: "jsdom", // Mô phỏng DOM trong Node.js
    setupFiles: "./src/setupTests.js", // File cấu hình khởi tạo
  },
});
