# Vite 전환 + Clean Architecture Refactor — 포트폴리오

**Date**: 2026-04-06
**Target**: `/Users/jaehyungkim/Desktop/web/portfolio`
**Status**: Awaiting user approval
**Execution mode (post-approval)**: 계획 승인 후 Step 1부터 순차 실행 (scope 제한적, 파일 직접 편집)

---

## 0. 배경 & 결정 사항

- 현재 사이트는 **Next.js 15 App Router** 기반이지만, 실사용 기능은 **단일 페이지 + 앵커 스크롤**뿐. Server Components, SSR, dynamic routes, API routes 모두 **미사용**.
- 사용자는 **React는 익숙하지만 Next.js는 모름**. 향후 유지보수·확장을 본인이 직접 할 예정이므로 **Vite + React 18**로 전환하는 것이 합리적.
- 전환은 기능적으로는 무손실이며(현재 Next 전용 기능을 사실상 안 쓰고 있음), 대신 빌드 도구가 단순해지고 브라우저-only SPA로 깔끔해짐.
- 이 기회에 **클린 아키텍처 리팩토링**도 함께 진행. 파일을 어차피 대부분 만지게 되므로 두 작업을 한 번에 하는 것이 총 편집량이 적음.

---

## 1. Requirements Summary

### 1.1 Phase A — 프레임워크 전환 (Next.js → Vite + React)

| # | 현상 | 해결 방향 |
|---|---|---|
| A1 | `next/font`, `next/image` 등 Next 전용 API는 **현재 사용 안 함** → 제거 비용 없음 | 그대로 삭제 |
| A2 | `src/app/layout.tsx`가 `<html>`, `<body>`를 선언 | Vite의 `index.html`로 이동 |
| A3 | `src/app/page.tsx`가 루트 페이지 | `src/App.tsx`로 변환 |
| A4 | `src/app/globals.css`가 Tailwind entry | `src/index.css` 등 루트로 이동 |
| A5 | `"use client"` 지시어가 일부 컴포넌트에 있음 | Vite는 불필요 → 지시어 삭제 |
| A6 | 메타데이터(`export const metadata: Metadata`) | `index.html`의 `<title>`, `<meta>` 태그로 이동 |
| A7 | 경로 alias `@/*` → `./src/*` | Vite `vite.config.ts` + `tsconfig.json`의 `paths`에 재설정 |
| A8 | Next 의존성 (next, eslint-config-next) | 제거, `vite`, `@vitejs/plugin-react` 추가 |
| A9 | dev 서버 포트 3000 | Vite 기본값 5173 사용 (launch.json 업데이트) |

### 1.2 Phase B — 클린 아키텍처 리팩토링

| # | 현상 | 위치 |
|---|---|---|
| B1 | **데이터·타입·UI가 한 파일에 섞임** — 557줄 단일 파일에 모든 콘텐츠 + Project 타입 공존 | `src/lib/content.ts` |
| B2 | **프레젠테이션 컴포넌트가 데이터 소스를 직접 import** | `src/components/Projects.tsx:1`, 모든 섹션 |
| B3 | **UI 프리미티브와 feature 컴포넌트 미분리** — `SpreadText`, `SectionHeader`가 feature 컴포넌트와 같은 디렉토리 | `src/components/` |
| B4 | **타입 중심 도메인 모델링 부재** — `Project`만 export, 나머지는 inference | `src/lib/content.ts:60` |
| B5 | **재사용 hooks 미추출** — `useClock` 인라인, scroll progress 로직이 `SpreadText` 내부 | `Hero.tsx:7-25`, `SpreadText.tsx:58-98` |
| B6 | **의존성 방향이 역전되지 않음** — `App.tsx`(전환 후)가 콘텐츠를 주입하도록 바꿔야 함 | `src/app/page.tsx` → `src/App.tsx` |

**Goal**: 시각/기능 결과물을 **100% 동등**하게 유지하면서 아래 원칙을 만족하는 구조로 재편:

1. **Vite + React 18 + TypeScript + Tailwind** 기반 SPA
2. **Separation of Concerns**: 도메인 타입 / 콘텐츠 데이터 / 프레젠테이션 / 인프라 훅 물리적 폴더 분리
3. **Dependency Rule**: UI는 도메인 타입만 알고, 콘텐츠는 props로 주입. 섹션은 `content/`를 import 금지
4. **UI primitives 분리**: `ui/` (범용) vs `sections/` (feature)
5. **Hook 재사용**: `useClock`, `useScrollProgress` 추출
6. **Single source of truth 유지**: 콘텐츠는 `content/` 폴더 안에서 관심사별로 파일 분리

---

## 2. Target Architecture

### 2.1 Directory Layout (after)

```
portfolio/
├── index.html                  # 🆕 Vite entry point (메타데이터, 루트 div)
├── vite.config.ts              # 🆕 Vite 설정 + alias
├── package.json                # ✏️ next 제거, vite 추가
├── tsconfig.json               # ✏️ Vite에 맞게 단순화
├── tsconfig.node.json          # 🆕 (Vite 권장)
├── postcss.config.mjs          # ✏️ 유지 (Tailwind)
├── .claude/launch.json         # ✏️ vite dev, port 5173
│
└── src/
    ├── main.tsx                # 🆕 ReactDOM.createRoot 엔트리
    ├── App.tsx                 # 🆕 콘텐츠 주입 + 섹션 컴포지션 (구 page.tsx 역할)
    ├── index.css               # 🆕 Tailwind entry (구 globals.css)
    │
    ├── domain/                 # 🆕 순수 도메인 타입 — React 의존 0
    │   ├── profile.ts
    │   ├── project.ts
    │   ├── skill.ts
    │   ├── resume.ts
    │   ├── philosophy.ts
    │   └── index.ts
    │
    ├── content/                # 🆕 정적 콘텐츠
    │   ├── profile.ts
    │   ├── projects.ts
    │   ├── philosophy.ts
    │   ├── skills.ts
    │   ├── resume.ts
    │   └── index.ts            # portfolioContent 배럴
    │
    ├── hooks/                  # 🆕 재사용 가능 인프라 훅
    │   ├── useClock.ts
    │   ├── useScrollProgress.ts
    │   └── index.ts
    │
    └── components/
        ├── ui/                 # 🆕 feature-agnostic primitives
        │   ├── SpreadText.tsx
        │   └── SectionHeader.tsx
        │
        └── sections/           # 🆕 feature 컴포넌트 (props-driven)
            ├── Nav.tsx
            ├── Hero.tsx
            ├── Intro.tsx       # 🆕 (기존 Hero의 CTA/intro 부분 분리)
            ├── About.tsx
            ├── Philosophy.tsx
            ├── Projects.tsx
            ├── Skills.tsx
            ├── Contact.tsx
            └── Footer.tsx
```

**제거되는 것**:
- `src/app/` (layout.tsx, page.tsx, globals.css) — Next App Router 제거
- `src/lib/content.ts` — content/로 분해 이동
- `src/components/` 루트의 기존 10개 컴포넌트 — sections/, ui/로 이동
- `next.config.ts`, `next-env.d.ts`, `eslint.config.mjs` (Next 기반) — 제거 또는 Vite용으로 교체
- `package.json`의 `next`, `eslint-config-next` 의존성
- `node_modules`, `.next` 캐시 — 재설치

### 2.2 Dependency Rule

```
index.html
    ↓
src/main.tsx
    ↓
src/App.tsx
    ↓ imports
components/sections/*  ──  components/ui/*
    ↓ imports                   ↓ imports
domain/*  ←──────── content/*  hooks/*
```

- **domain** 은 아무것도 import하지 않음 (leaf)
- **content** 는 오직 `domain/` 만
- **hooks** 는 React 만
- **components/ui** 는 `hooks/`, React 만. `content/` 절대 금지
- **components/sections** 는 `domain/` (타입만), `components/ui/`, `hooks/` 만. `content/` 절대 금지
- **src/App.tsx** 만 `content/` 와 `components/sections/` 를 함께 import → 결합점이 1곳에 모임

### 2.3 구체 파일 매핑 (Before → After)

| Before | After | 비고 |
|---|---|---|
| `src/app/layout.tsx` | `index.html` + `src/main.tsx` | html/body, 메타데이터 분리 |
| `src/app/page.tsx` | `src/App.tsx` | 콘텐츠 주입 컨테이너로 재작성 |
| `src/app/globals.css` | `src/index.css` | 그대로 이동 (내용 변경 0) |
| `src/lib/content.ts:1-10` (profile) | `src/content/profile.ts` | `Profile` 타입 사용 |
| `src/lib/content.ts:12-31` (philosophy) | `src/content/philosophy.ts` | |
| `src/lib/content.ts:33-56` (Project 타입) | `src/domain/project.ts` | `as const` 제거, 명시적 interface |
| `src/lib/content.ts:58-502` (projects 배열) | `src/content/projects.ts` | `Project[]` 명시 |
| `src/lib/content.ts:504-512` (skills object) | `src/content/skills.ts` + `src/domain/skill.ts` | **배열로 리모델링** |
| `src/lib/content.ts:514-557` (work/ed/awards...) | `src/content/resume.ts` + `src/domain/resume.ts` | |
| `src/components/Hero.tsx:7-25` (useClock) | `src/hooks/useClock.ts` | 파라미터화 |
| `src/components/SpreadText.tsx:58-98` | `src/hooks/useScrollProgress.ts` | 재사용 훅으로 추출 |
| `src/components/SpreadText.tsx` | `src/components/ui/SpreadText.tsx` | "use client" 제거 |
| `src/components/SectionHeader.tsx` | `src/components/ui/SectionHeader.tsx` | |
| 나머지 섹션 9개 | `src/components/sections/*.tsx` | props-driven 리팩 + "use client" 제거 |

### 2.4 데이터 흐름 예시 (Hero 섹션)

**Before** (Next.js + content 직접 import):
```tsx
// src/components/Hero.tsx
"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import SpreadText from "./SpreadText";

function useClock() { /* 19줄 */ }

export default function Hero() {
  const time = useClock();
  return <section>... {profile.name} ...</section>;
}
```

**After** (Vite + React, props-driven):
```tsx
// src/App.tsx
import { portfolioContent } from "@/content";
import { Hero } from "@/components/sections/Hero";

export default function App() {
  return <Hero profile={portfolioContent.profile} />;
}

// src/components/sections/Hero.tsx
import type { Profile } from "@/domain";
import { SpreadText } from "@/components/ui/SpreadText";
import { useClock } from "@/hooks/useClock";

type Props = { profile: Profile };

export function Hero({ profile }: Props) {
  const time = useClock();
  return <section>... {profile.name} ...</section>;
}

// src/hooks/useClock.ts
import { useEffect, useState } from "react";

export function useClock(timeZone = "Asia/Seoul"): string {
  const [time, setTime] = useState("");
  useEffect(() => { /* ... */ }, [timeZone]);
  return time;
}
```

### 2.5 도메인 타입 예시

```ts
// src/domain/project.ts
export interface ProjectEnvironment {
  xcode: string;
  minIOS: string;
  swift: string;
}

export interface ProjectFeature {
  title: string;
  body: string;
}

export interface ProjectStackItem {
  label: string;
  items: string;
}

export interface ProjectHighlight {
  title: string;
  body: string;
}

export interface ProjectTrouble {
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  bullets?: readonly string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  index: string;
  tagline: string;
  period: string;
  team: string;
  status?: string;
  link?: ProjectLink;
  env: ProjectEnvironment;
  features: readonly ProjectFeature[];
  stack: readonly ProjectStackItem[];
  highlights: readonly ProjectHighlight[];
  troubles: readonly ProjectTrouble[];
}
```

### 2.6 Content 진입점

```ts
// src/content/index.ts
import type { Profile, Project, PhilosophyCard, SkillCategory, Resume } from "@/domain";
import { profile } from "./profile";
import { projects } from "./projects";
import { philosophy } from "./philosophy";
import { skills } from "./skills";
import { resume } from "./resume";

export interface PortfolioContent {
  profile: Profile;
  projects: readonly Project[];
  philosophy: readonly PhilosophyCard[];
  skills: readonly SkillCategory[];
  resume: Resume;
}

export const portfolioContent: PortfolioContent = {
  profile,
  projects,
  philosophy,
  skills,
  resume,
};
```

### 2.7 Vite 설정 예시

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 5173 },
});
```

```html
<!-- index.html -->
<!doctype html>
<html lang="ko" class="h-full antialiased">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>김재형 · App Developer</title>
    <meta
      name="description"
      content="제가 남긴 발자국이 누군가의 꿈이 되기를 바라는 앱 개발자 김재형의 포트폴리오. iOS와 Flutter."
    />
  </head>
  <body class="min-h-full bg-background text-foreground font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 3. Acceptance Criteria

모두 testable + concrete:

### Phase A — 프레임워크 전환 AC

- [ ] **AC-A1**: `package.json`에 `next`, `eslint-config-next` 의존성이 **제거됨**
- [ ] **AC-A2**: `package.json`에 `vite`, `@vitejs/plugin-react` 가 추가되고 `scripts.dev`가 `vite`로 설정됨
- [ ] **AC-A3**: 프로젝트 루트에 `index.html`, `vite.config.ts` 존재
- [ ] **AC-A4**: `src/app/` 디렉토리와 `next.config.ts`, `next-env.d.ts` **모두 삭제됨**
- [ ] **AC-A5**: `grep -rn "use client" src/` → 0건 (Vite에서는 불필요)
- [ ] **AC-A6**: `grep -rn "from \"next/" src/` → 0건
- [ ] **AC-A7**: Vite dev 서버가 포트 5173에서 기동 (launch.json 업데이트)
- [ ] **AC-A8**: `tsc --noEmit` 에러 0

### Phase B — 클린 아키텍처 AC

- [ ] **AC-B1**: `npx tsc --noEmit` 에러 0
- [ ] **AC-B2**: Dev 서버 로그에 error/FATAL 없음
- [ ] **AC-B3**: 브라우저 콘솔 에러 없음
- [ ] **AC-B4**: Dependency rule — 다음 grep 결과 모두 0건
  - `grep -rn "@/content" src/components/`
  - `grep -rn "@/content" src/components/ui/`
  - `grep -rn "@/content" src/hooks/`
  - `grep -rn "@/content" src/domain/`
  - `grep -rn "from \"react\"" src/domain/`
- [ ] **AC-B5**: `import type { Profile, Project } from "@/domain"` 컴파일 성공
- [ ] **AC-B6**: `useClock`, `useScrollProgress` 가 `src/hooks/`에서 export되고 최소 하나 이상의 섹션에서 사용
- [ ] **AC-B7**: `src/lib/content.ts` 제거, `grep "@/lib/content" src/` → 0건
- [ ] **AC-B8**: 섹션 컴포넌트 파일 상단 import에 `@/content` 참조 0건

### 통합 — 시각 동등성 AC

- [ ] **AC-V1**: scrollY ∈ {0, 200, 400, 900, 1800} 에서 스크린샷 이전/이후 시각적 동등
- [ ] **AC-V2**: SpreadText scatter 효과 정상 동작 (scrollY 0→400 에서 글자 수직 분산)
- [ ] **AC-V3**: useClock 값이 정상 렌더(KST 시각 표기)
- [ ] **AC-V4**: Hero → Intro → About → Philosophy → Projects → Skills → Contact → Footer 렌더 순서 유지

---

## 4. Implementation Steps

**총 ~25 파일, ~1800 LOC 이동/수정. 15단계.**

### Phase A — Vite 전환

#### Step A1 — 현재 Next 프로젝트 백업 지점 기록
```bash
cd /Users/jaehyungkim/Desktop/web/portfolio
git add -A && git commit -m "checkpoint: before vite migration" || true
```
_검증_: `git log --oneline | head -1` 로 체크포인트 확인

#### Step A2 — Vite 의존성 설치 + Next 제거
```bash
npm uninstall next eslint-config-next
npm install -D vite @vitejs/plugin-react @types/node
```
_검증_: `node_modules/vite` 존재, `node_modules/next` 부재

#### Step A3 — Vite 설정 파일 작성
- `vite.config.ts` 생성 (위 2.7 예시)
- `tsconfig.json` 수정: Next 전용 설정 제거, `"paths": {"@/*": ["./src/*"]}` 유지, `"jsx": "react-jsx"` 추가
- `tsconfig.node.json` 생성 (Vite 설정 파일 타입체크용)

_검증_: `npx tsc --noEmit` 에러 0

#### Step A4 — `index.html` 생성
- 루트에 `index.html` 작성 (위 2.7 예시)
- 기존 `src/app/layout.tsx`의 메타데이터를 `<meta>` 태그로 이동

_검증_: 파일 존재

#### Step A5 — `src/main.tsx`, `src/index.css` 생성
```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
- `src/index.css`는 `src/app/globals.css`의 내용을 그대로 복사

_검증_: 파일 존재

#### Step A6 — 임시 `src/App.tsx` 생성 (기존 page.tsx 그대로 이동)
```tsx
// src/App.tsx (임시 — Phase B에서 재작성됨)
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Philosophy from "./components/Philosophy";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

_검증_: 파일 존재

#### Step A7 — 기존 컴포넌트에서 `"use client"` 제거
```bash
# 모든 .tsx 파일 상단의 "use client" 디렉티브 제거
```
_검증_: `grep -rn "use client" src/` → 0건

#### Step A8 — `src/app/` 및 Next 관련 파일 삭제
```bash
rm -rf src/app
rm -f next.config.ts next-env.d.ts eslint.config.mjs
rm -rf .next
```
_검증_: `ls src/app` → `No such file`

#### Step A9 — `.claude/launch.json` 업데이트 + dev 서버 재시작
```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "vite-dev",
      "runtimeExecutable": "/usr/bin/env",
      "runtimeArgs": [
        "PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin",
        "/opt/homebrew/bin/node",
        "node_modules/vite/bin/vite.js",
        "--port",
        "5173"
      ],
      "port": 5173
    }
  ]
}
```
- `preview_stop` 기존 next-dev
- `preview_start vite-dev`

_검증_: preview_logs 로 `VITE vX.X.X ready in ... ms` 확인

#### Step A10 — Vite 상태에서 사이트 로드 확인
- `preview_screenshot` 으로 scrollY 0, 400, 1800 확인
- scatter 효과 동작, KST 시계, 모든 섹션 렌더 확인

_검증_: 시각 결과가 전환 전과 동등 (AC-V1~V4)

---

### Phase B — Clean Architecture 리팩토링

#### Step B1 — 새 디렉토리 생성
```bash
mkdir -p src/domain src/content src/hooks src/components/ui src/components/sections
```
_검증_: `ls src/` 에 새 폴더 존재

#### Step B2 — 도메인 타입 정의
- `src/domain/profile.ts`: `Profile`, `ContactChannel`
- `src/domain/project.ts`: 위 2.5 예시
- `src/domain/skill.ts`: `interface SkillCategory { category: string; items: readonly string[] }`
- `src/domain/resume.ts`: `WorkExperience`, `Leadership`, `Education`, `Activity`, `Award`, `Certificate`, `Resume`
- `src/domain/philosophy.ts`: `PhilosophyCard`
- `src/domain/index.ts`: 전체 re-export

_검증_: `npx tsc --noEmit` 통과

#### Step B3 — 콘텐츠 파일 작성
- `src/content/profile.ts` ← `src/lib/content.ts` profile 영역
- `src/content/philosophy.ts` ← philosophy 영역
- `src/content/projects.ts` ← projects 영역 (명시적 `Project[]` 타입)
- `src/content/skills.ts` ← skills 영역 (**object → array로 변환**)
- `src/content/resume.ts` ← work/leadership/education/activities/awards/certificates 를 `Resume` 객체로 묶음
- `src/content/index.ts` ← `portfolioContent` 배럴

_검증_: `npx tsc --noEmit` 통과 (아직 사용처 없음)

#### Step B4 — Hooks 추출
- `src/hooks/useClock.ts` ← `Hero.tsx`의 `useClock` 함수
- `src/hooks/useScrollProgress.ts` ← `SpreadText.tsx`의 progress 계산 로직. 시그니처:
  ```ts
  export function useScrollProgress(
    ref: React.RefObject<HTMLElement | null>,
    options: { travel: number; stageSelector?: string }
  ): number;
  ```
- `src/hooks/index.ts` ← re-export

_검증_: `npx tsc --noEmit` 통과

#### Step B5 — UI Primitives 이동
- `src/components/SectionHeader.tsx` → `src/components/ui/SectionHeader.tsx` (내용 변경 0, named export로 통일)
- `src/components/SpreadText.tsx` → `src/components/ui/SpreadText.tsx`
  - 내부 progress 로직을 `useScrollProgress` 호출로 대체
  - named export (`export function SpreadText`)

_검증_:
- `npx tsc --noEmit` 통과
- `grep "@/content" src/components/ui/` 0건
- 브라우저에서 scatter 동작 유지

#### Step B6 — Section 컴포넌트 이동 및 props-driven 리팩토링

**9개 파일 각각**:

1. `src/components/X.tsx` → `src/components/sections/X.tsx` 이동
2. `import ... from "@/lib/content"` 제거
3. `import type { ... } from "@/domain"` 추가
4. 컴포넌트를 props 받는 함수로 변경 (named export)
5. 내부 데이터 참조를 `props.X` 로 치환
6. `useClock` 같은 훅은 `@/hooks` 에서 import

| 섹션 | Props 시그니처 |
|---|---|
| **Nav** | `{ email: string }` (links는 파일 내부 상수) |
| **Hero** | `{ profile: Profile }` (sticky scatter stage 부분만) |
| **Intro** 🆕 | `{ profile: Profile }` (기존 Hero에서 분리한 CTA 섹션) |
| **About** | `{ profile: Profile, resume: Resume }` |
| **Philosophy** | `{ items: readonly PhilosophyCard[] }` |
| **Projects** | `{ items: readonly Project[] }` |
| **Skills** | `{ categories: readonly SkillCategory[] }` (기존 `Object.entries(skills)` → `categories.map`) |
| **Contact** | `{ profile: Profile }` |
| **Footer** | props 없음 (정적) |

_검증_: 각 파일 저장 후 `npx tsc --noEmit` 통과, dev 서버 compile 성공

#### Step B7 — `src/App.tsx` 최종 재작성
```tsx
import { portfolioContent } from "@/content";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { Philosophy } from "@/components/sections/Philosophy";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function App() {
  const { profile, projects, philosophy, skills, resume } = portfolioContent;
  return (
    <>
      <Nav email={profile.email} />
      <main>
        <Hero profile={profile} />
        <Intro profile={profile} />
        <About profile={profile} resume={resume} />
        <Philosophy items={philosophy} />
        <Projects items={projects} />
        <Skills categories={skills} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}
```

_검증_: `npx tsc --noEmit` 통과

#### Step B8 — 구 파일 정리
```bash
rm src/lib/content.ts
rmdir src/lib 2>/dev/null || true
rm src/components/{Nav,Hero,About,Philosophy,Projects,Skills,Contact,Footer,SectionHeader,SpreadText}.tsx
```
_검증_:
- `test ! -f src/lib/content.ts`
- `find src/components -maxdepth 1 -type f -name "*.tsx"` → 빈 결과
- `grep -rn "@/lib/content" src/` → 0건

#### Step B9 — 최종 검증
```bash
cd /Users/jaehyungkim/Desktop/web/portfolio
npx tsc --noEmit
grep -rn "@/lib/content" src/        # 0건
grep -rn "@/content" src/components/ # 0건
grep -rn "@/content" src/hooks/      # 0건
grep -rn "@/content" src/domain/     # 0건
grep -rn "use client" src/           # 0건 (Phase A에서 이미)
grep -rn "from \"next/" src/         # 0건
```
- `preview_logs level=error` → empty
- `preview_screenshot` × 5 위치 (0, 200, 400, 900, 1800) → 전환 전과 동등
- `preview_console_logs level=error` → empty

_검증_: 모든 AC 만족

---

## 5. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Vite에서 Tailwind v4 plugin 설정 미묘한 차이** — 현재 `@import "tailwindcss"` 방식이 Vite + Tailwind v4에서 동일하게 동작하는지 확인 필요 | Medium | High | Phase A 중 Step A10에서 스크린샷 바로 찍어 스타일 확인. 문제 시 `@tailwindcss/vite` 플러그인 추가 |
| R2 | **SpreadText progress 로직 추출 실수** — ref 전달/cleanup/stageSelector 기본값 미세 차이로 scatter 효과 깨짐 | Medium | High | Step B5 직후 수동 스크린샷 비교. 실패 시 훅을 폐기하고 원상 복구 |
| R3 | **Skills object → array 변환 중 카테고리 순서/누락** | Medium | Low | 변환 후 Skills 섹션 스크린샷으로 6개 카테고리 모두 동일 순서 확인 |
| R4 | **`"use client"` 제거 누락 파일** — Vite에서 에러는 아니지만 모양새가 나쁨 | Low | Low | `grep -rn "use client" src/` 로 강제 검증 |
| R5 | **Path alias `@/*` 인식 실패** — Vite + tsc + 에디터 세 곳 동기화 필요 | Medium | Medium | `vite.config.ts`와 `tsconfig.json` 양쪽에 동시 설정. dev 서버 기동 확인 |
| R6 | **Next → Vite 전환 중 기존 Next dev 서버가 계속 점유하여 포트 충돌** | Low | Low | `preview_stop` 먼저 호출, 이후 `preview_start vite-dev` |
| R7 | **섹션 컴포넌트 리팩 중 JSX 구조 실수 → 시각 리그레션** | Medium | High | Step B6을 **파일 하나씩** 진행 + 각 파일마다 해당 섹션 스크린샷 확인 |
| R8 | **readonly 타입 vs 기존 inferred literal 타입 불일치** | Low | Low | domain을 `readonly` 기반으로 설계하여 처음부터 대응 |
| R9 | **Fast Refresh / HMR 상태 오염** — 대량 파일 이동 시 Vite가 이전 모듈 캐싱 | Medium | Low | 필요 시 dev 서버 재시작 |
| R10 | **Tailwind content glob 경로** — Vite 전환 후 Tailwind가 새 파일 경로를 스캔하지 못해 일부 클래스 누락 | Medium | Medium | Tailwind config에 `"./index.html", "./src/**/*.{ts,tsx}"` 명시 확인 |

---

## 6. Verification Steps (완료 후)

1. **빌드**: `npx tsc --noEmit` → 에러 0
2. **Prod 빌드**: `npx vite build` → 성공, `dist/` 생성
3. **Dev 로그**: `preview_logs level=error lines=30` → FATAL 없음
4. **콘솔**: `preview_console_logs level=error` → empty
5. **Dependency rule grep 7종** (AC-A5, A6, B4, B7 모두)
6. **Visual regression**:
   - scrollY=0: 히어로 정렬 상태
   - scrollY=200: scatter 진행 초기
   - scrollY=400: scatter 절정
   - scrollY=900: scatter 완료 + 아직 intro 전
   - scrollY=1800: intro + About 등장
7. **Hook 사용처**: `grep -l "useClock\|useScrollProgress" src/components/sections/` → 최소 2건
8. **Barrel import**: 임시 파일에 `import type { Profile, Project } from "@/domain"` → tsc 통과

---

## 7. Out of Scope (명시적 제외)

- ❌ Storybook 도입
- ❌ 단위 테스트 (Jest/Vitest)
- ❌ 시각 디자인/애니메이션 파라미터 변경
- ❌ 새 섹션 추가 / 기존 기능 확장
- ❌ 이미지 최적화, SEO 심화, sitemap
- ❌ i18n
- ❌ CMS 연동 (이번 리팩이 가능케 하는 기반 작업)
- ❌ CI/CD, deploy 자동화
- ❌ ESLint 경계 검증 (dependency-cruiser 등)
- ❌ react-router 도입 (현재 단일 페이지라 불필요)
- ❌ PWA, Service Worker

---

## 8. Success Summary (1-line)

> **Next.js를 Vite + React로 전환해 사용자가 익숙한 스택으로 돌리고, 동시에 콘텐츠·도메인·UI·훅·섹션을 물리적 폴더로 분리해 결합점을 `src/App.tsx` 한 곳으로 모아, 미래 유지보수와 CMS 교체를 가능하게 한다.**

---

## Approval Request

이 계획서는 **검증 대기 중** 입니다.

- ✅ **Approve** — Phase A → Phase B 순차 실행 시작
- ✏️ **Revise** — 어느 부분을 수정할지 피드백
- ❌ **Reject** — 다른 접근 필요

**확인 요청 사항**:
1. `Intro` 섹션을 Hero에서 분리하는 것에 동의하시는지 (현재는 Hero 안에 intro 블록이 있음)
2. Skills 데이터 구조를 `object` → `array`로 바꾸는 것에 동의하시는지 (순서가 명시적이 되지만 기존 코드와 호환성은 깨짐)
3. dev 서버 포트를 3000 → 5173으로 변경해도 괜찮은지
