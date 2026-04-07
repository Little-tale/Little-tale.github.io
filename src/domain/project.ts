// 이 파일은 프로젝트 섹션 한 블록을 구성하는 세부 데이터 타입들을 정의한다.
// 프로젝트 메타 정보, 기능 요약, 문제 해결 사례를 분리해 긴 콘텐츠도 일관되게 표현할 수 있게 한다.
// 프로젝트별 개발 환경 정보를 나타낸다.
export type ProjectEnv = {
  xcode: string;
  minIOS: string;
  swift: string;
};

// 프로젝트의 핵심 기능 카드 한 장을 나타낸다.
export type ProjectFeature = {
  title: string;
  body: string;
};

// 프로젝트 스택 섹션에서 한 줄로 표시할 라벨/값 쌍이다.
export type ProjectStackEntry = {
  label: string;
  items: string;
};

// 프로젝트에서 강조하고 싶은 구현 포인트 한 항목이다.
export type ProjectHighlight = {
  title: string;
  body: string;
};

// 문제 해결 사례 아코디언 한 패널의 구조다.
export type ProjectTrouble = {
  title: string;
  problem: string;
  cause?: string;
  solution: string;
  bullets?: readonly string[];
};

// 프로젝트 외부 링크 버튼의 레이블과 목적지를 나타낸다.
export type ProjectLink = {
  label: string;
  href: string;
};

// 포트폴리오 프로젝트 카드/상세 섹션 전체를 구성하는 데이터 구조다.
export type Project = {
  id: string;
  title: string;
  index: string;
  tagline: string;
  period: string;
  team: string;
  status?: string;
  image?: string;
  link?: ProjectLink;
  env: ProjectEnv;
  features: readonly ProjectFeature[];
  stack: readonly ProjectStackEntry[];
  highlights: readonly ProjectHighlight[];
  troubles: readonly ProjectTrouble[];
};
