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

export type PortfolioContent = {
  profile: Profile;
  philosophy: readonly PhilosophyEntry[];
  projects: readonly Project[];
  skills: readonly SkillCategory[];
  resume: Resume;
};
