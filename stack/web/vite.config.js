import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // shadcn/ui 부품이 "@/components/..."처럼 src/ 기준 주소로 서로를 부른다.
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: {
    // 화면이 /api/... 를 부르면 같은 compose 안의 api 컨테이너로 넘긴다.
    proxy: { "/api": "http://api:8000" },
    // Cloudflare 터널 주소로 들어와도 화면을 연다.
    allowedHosts: [".trycloudflare.com"],
    // 윈도에서도 코드를 고치면 바로 화면에 반영한다.
    watch: { usePolling: true },
  },
});
