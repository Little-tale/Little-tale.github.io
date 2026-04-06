// 이 파일은 Vite가 브라우저에서 가장 먼저 실행하는 React 부트스트랩 진입점이다.
// 전역 스타일을 로드하고, `#root` DOM 노드에 앱 루트를 마운트하는 역할만 담당한다.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 개발 중 잠재적인 부작용을 더 빨리 드러내기 위해 StrictMode로 전체 앱을 감싼다.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
