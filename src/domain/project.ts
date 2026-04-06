export type ProjectEnv = {
  xcode: string;
  minIOS: string;
  swift: string;
};

export type ProjectFeature = {
  title: string;
  body: string;
};

export type ProjectStackEntry = {
  label: string;
  items: string;
};

export type ProjectHighlight = {
  title: string;
  body: string;
};

export type ProjectTrouble = {
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  bullets?: readonly string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  index: string;
  tagline: string;
  period: string;
  team: string;
  status?: string;
  link?: ProjectLink;
  env: ProjectEnv;
  features: readonly ProjectFeature[];
  stack: readonly ProjectStackEntry[];
  highlights: readonly ProjectHighlight[];
  troubles: readonly ProjectTrouble[];
};
