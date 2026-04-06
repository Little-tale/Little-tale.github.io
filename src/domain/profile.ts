// 이 파일은 포트폴리오 상단 소개와 연락처 섹션에 공통으로 쓰이는 기본 프로필 구조를 정의한다.
// 개인 식별 정보와 외부 링크를 하나의 도메인 타입으로 묶어 콘텐츠/컴포넌트 간 결합을 낮춘다.
// 포트폴리오 전역에서 공유하는 개인 프로필 정보 구조다.
export type Profile = {
  name: string;
  nameEn: string;
  role: string;
  birth: string;
  email: string;
  phone: string;
  github: string;
  blog: string;
  tagline: string;
  intro: string;
};
