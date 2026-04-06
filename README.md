# Little-tale Portfolio

개인 포트폴리오 사이트. Vite + React 19 + TypeScript + Tailwind CSS v4 로 만들었고, GitHub Actions 로 GitHub Pages 에 자동 배포된다.

🔗 **Live:** https://little-tale.github.io/

## Tech Stack

- **Build:** Vite 8
- **UI:** React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Deploy:** GitHub Actions → GitHub Pages

## Getting Started

Node.js `>=20.19.0` 필요 (`.nvmrc` 참고).

```bash
npm install
npm run dev
```

`http://localhost:5173` 에서 확인. 포트는 `vite.config.js` 에서 `strictPort` 로 고정돼 있어 바뀌지 않는다.

## Scripts

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (`localhost:5173`) |
| `npm run build` | `tsc -b` 타입 체크 후 `dist/` 로 프로덕션 번들 |
| `npm run preview` | 빌드 결과물 로컬 프리뷰 |

## Project Structure

```
src/            앱 소스 (컴포넌트, 페이지, 스타일)
public/         정적 에셋
vite.config.js  Vite / 플러그인 / 경로 별칭 설정
```

경로 별칭 `@` → `./src` 가 설정돼 있어 `import Foo from "@/components/Foo"` 형태로 임포트할 수 있다.

## Deployment

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 돌면서 Vite 빌드 후 `dist/` 를 GitHub Pages 에 올린다. 레포명(`Little-tale.github.io`)이 유저명과 일치하므로 user site 로 인식돼 루트 도메인에 서빙된다.
