// 이 파일은 여러 정적 콘텐츠 모듈을 한 번에 불러오기 위한 집합 진입점이다.
// 앱 루트에서는 이 객체 하나만 읽어 전체 포트폴리오 섹션 데이터를 전달한다.
import type { PortfolioContent } from "@/domain";
import { profile } from "./profile";
import { philosophy } from "./philosophy";
import { projects } from "./projects";
import { skills, aiWorkflow } from "./skills";
import { resume } from "./resume";

// 화면 섹션 순서에 맞춰 모든 정적 콘텐츠를 한 객체로 묶는다.
export const portfolioContent: PortfolioContent = {
  profile,
  philosophy,
  projects,
  skills,
  aiWorkflow,
  resume,
};

// 개별 섹션에서 직접 가져다 쓸 수 있도록 원본 콘텐츠도 함께 재노출한다.
export { profile, philosophy, projects, skills, aiWorkflow, resume };
