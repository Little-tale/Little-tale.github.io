// 이 파일은 도메인 타입들의 공개 진입점이다.
// 컴포넌트와 콘텐츠 레이어가 개별 파일 경로를 몰라도 되도록 re-export를 한곳에 모은다.
export type { Profile } from "./profile";
export type { PhilosophyEntry } from "./philosophy";
export type {
  Project,
  ProjectEnv,
  ProjectFeature,
  ProjectStackEntry,
  ProjectHighlight,
  ProjectTrouble,
  ProjectLink,
} from "./project";
export type { SkillCategory } from "./skill";
export type {
  Resume,
  ResumeEntry,
  WorkEntry,
  LeadershipEntry,
  EducationEntry,
  ActivityEntry,
  AwardEntry,
  CertificateEntry,
} from "./resume";

import type { Profile } from "./profile";
import type { PhilosophyEntry } from "./philosophy";
import type { Project } from "./project";
import type { SkillCategory } from "./skill";
import type { Resume } from "./resume";

// 포트폴리오 단일 페이지를 구성하는 정적 콘텐츠 전체 묶음이다.
export type PortfolioContent = {
  profile: Profile;
  philosophy: readonly PhilosophyEntry[];
  projects: readonly Project[];
  skills: readonly SkillCategory[];
  resume: Resume;
};
