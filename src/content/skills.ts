// 이 파일은 기술 스택 섹션과 하단 마키 텍스트의 원본 데이터를 담는다.
// 카테고리 이름과 항목 순서는 시각적 그룹핑에 직접 반영되므로 임의 정렬하지 않는다.
import type { AIWorkflowTool, SkillCategory } from "@/domain";

// 카테고리별로 끊어 주어 스택 폭이 넓어도 사용자가 빠르게 훑어볼 수 있게 한다.
export const skills: readonly SkillCategory[] = [
  {
    name: "Frameworks",
    items: ["UIKit", "SwiftUI", "AlarmKit", "MapKit", "Flutter"],
  },
  { name: "Network", items: ["URLSession", "Alamofire", "Socket.IO"] },
  { name: "Reactive & State", items: ["RxSwift", "Combine"] },
  {
    name: "Architecture",
    items: ["MVC", "MVVM", "MVI", "Redux", "TCA", "Clean Architecture"],
  },
  { name: "Tools", items: ["GitHub", "Slack", "Tuist", "Fastlane", "Figma"] },
  { name: "Others", items: ["Realm", "SnapKit", "PinLayout", "Dart"] },
];

// "한 툴에 락인되지 않고, 문제의 결에 맞는 에이전트를 고른다" 는 AI 워크플로 성향을 보여 주는 도구 묶음이다.
// 카드 순서는 주력 → 보조 → 오픈소스 하네스 → 긴 호흡 IDE 흐름으로 읽히도록 배치한다.
export const aiWorkflow: readonly AIWorkflowTool[] = [
  {
    name: "Claude Code",
    vendor: "Anthropic",
    role: "Plan 및 코드 구현을 담당하는 주력 에이전트. 설계부터 구현까지 한 흐름으로 굴린다.",
  },
  {
    name: "Codex",
    alias: "@openai/codex",
    vendor: "OpenAI",
    role: "코드 검증·코드리뷰·재구현 담당. 두 번째 시선으로 Claude의 결과를 교차 검증한다.",
  },
  {
    name: "OpenCode",
    alias: "Oh-my-OpenAgent",
    vendor: "Open Source",
    role: "멀티모델 하네스. GPT·Kimi·GLM 등을 병렬 실행해 같은 문제를 여러 관점으로 본다.",
  },
  {
    name: "Antigravity",
    vendor: "Google",
    role: "에이전틱 IDE. Manager Surface 에서 여러 에이전트를 비동기로 돌려 긴 호흡 작업을 처리한다.",
  },
];
