// 이 파일은 About 섹션에서 사용하는 이력서형 데이터 구조를 정의한다.
// 경력, 학력, 수상, 자격증처럼 표현 방식은 비슷하지만 의미가 다른 묶음을 타입으로 분리한다.
// 제목/메타/본문 조합의 공통 이력 항목 구조다.
export type ResumeEntry = {
  title: string;
  meta?: string;
  body: string;
};

// 회사 경력 한 줄의 원본 구조다.
export type WorkEntry = {
  company: string;
  role: string;
  period: string;
  body: string;
};

// 리더십 경험은 회사 경력과 동일한 필드를 사용한다.
export type LeadershipEntry = WorkEntry;

// 학력 섹션 한 항목의 구조다.
export type EducationEntry = {
  school: string;
  major: string;
  period: string;
  note: string;
};

// 대외 활동 또는 커뮤니티 활동 한 항목의 구조다.
export type ActivityEntry = {
  name: string;
  role: string;
  body: string;
};

// 수상 이력 한 항목의 구조다.
export type AwardEntry = {
  title: string;
  date: string;
  body: string;
};

// 자격증 이력 한 항목의 구조다.
export type CertificateEntry = {
  title: string;
  date: string;
  body: string;
};

// About 섹션 전체에 필요한 이력 데이터 묶음이다.
export type Resume = {
  work: readonly WorkEntry[];
  leadership: readonly LeadershipEntry[];
  education: readonly EducationEntry[];
  activities: readonly ActivityEntry[];
  awards: readonly AwardEntry[];
  certificates: readonly CertificateEntry[];
};
