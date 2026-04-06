import type { PortfolioContent } from "@/domain";
import { profile } from "./profile";
import { philosophy } from "./philosophy";
import { projects } from "./projects";
import { skills } from "./skills";
import { resume } from "./resume";

export const portfolioContent: PortfolioContent = {
  profile,
  philosophy,
  projects,
  skills,
  resume,
};

export { profile, philosophy, projects, skills, resume };
