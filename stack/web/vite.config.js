import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // 화면이 /api/... 를 부르면 같은 compose 안의 api 컨테이너로 넘긴다.
    proxy: { "/api": "http://api:8000" },
    // Cloudflare 터널 주소나 Tailscale 주소(….ts.net)로 들어와도 화면을 연다.
    allowedHosts: [".trycloudflare.com", ".ts.net"],
    // 윈도에서도 코드를 고치면 바로 화면에 반영한다.
    watch: { usePolling: true },
  },
});
