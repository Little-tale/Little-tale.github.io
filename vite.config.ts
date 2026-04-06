// 이 파일은 Vite 개발 서버와 프로덕션 번들 설정의 단일 진입점이다.
// React 플러그인, Tailwind v4 플러그인, 경로 별칭, 고정 포트 정책을 함께 정의한다.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

/**
 * 포트폴리오 앱의 Vite 실행 환경을 설정한다.
 * 반환값은 개발 서버 동작과 번들 해석 방식을 결정하는 Vite 설정 객체다.
 * `strictPort`를 켜 두어 로컬 실행 포트가 바뀌지 않도록 강제한다.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
